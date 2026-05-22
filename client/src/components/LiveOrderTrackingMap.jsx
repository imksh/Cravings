import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";

import L from "leaflet";

/* -------------------------------------------------------------------------- */
/*                                   ICONS                                    */
/* -------------------------------------------------------------------------- */

const createIcon = (
  emoji,
  bg,
) => {
  return L.divIcon({
    html: `
      <div
        style="
          width:48px;
          height:48px;
          border-radius:999px;
          background:${bg};
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:22px;
          box-shadow:0 10px 25px rgba(15,23,42,0.22);
          border:3px solid white;
        "
      >
        ${emoji}
      </div>
    `,
    className: "",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

const userIcon =
  createIcon(
    "🏠",
    "#0f172a"
  );

const restaurantIcon =
  createIcon(
    "🍔",
    "#f97316"
  );

const riderIcon =
  createIcon(
    "🏍️",
    "#16a34a"
  );

/* -------------------------------------------------------------------------- */
/*                               FIT BOUNDS                                   */
/* -------------------------------------------------------------------------- */

const FitBounds = ({
  points,
}) => {
  const map = useMap();

  useEffect(() => {
    if (!points?.length)
      return;

    const validPoints =
      points.filter(
        (p) =>
          typeof p?.lat ===
            "number" &&
          typeof p?.lng ===
            "number"
      );

    if (
      validPoints.length === 0
    )
      return;

    const bounds =
      L.latLngBounds(
        validPoints.map(
          (p) => [
            p.lat,
            p.lng,
          ]
        )
      );

    map.fitBounds(bounds, {
      padding: [60, 60],
    });
  }, [map, points]);

  return null;
};

/* -------------------------------------------------------------------------- */
/*                          LIVE ORDER TRACKING MAP                           */
/* -------------------------------------------------------------------------- */

const LiveOrderTrackingMap =
  ({
    userLocation,
    restaurantLocation,
    riderLocation,
    height = "500px",
  }) => {
    const mapRef =
      useRef(null);

    const [route, setRoute] =
      useState([]);

    const [routeInfo, setRouteInfo] =
      useState({
        distance: null,
        duration: null,
      });

    /* -------------------------------------------------------------------------- */
    /*                                MAP CENTER                                  */
    /* -------------------------------------------------------------------------- */

    const center =
      useMemo(() => {
        if (
          riderLocation
        ) {
          return [
            riderLocation.lat,
            riderLocation.lng,
          ];
        }

        if (
          restaurantLocation
        ) {
          return [
            restaurantLocation.lat,
            restaurantLocation.lng,
          ];
        }

        if (
          userLocation
        ) {
          return [
            userLocation.lat,
            userLocation.lng,
          ];
        }

        return [
          23.2599,
          77.4126,
        ];
      }, [
        riderLocation,
        restaurantLocation,
        userLocation,
      ]);

    /* -------------------------------------------------------------------------- */
    /*                              FETCH ROUTE                                   */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
      const fetchRoute =
        async () => {
          try {
            let start =
              null;

            let end = null;

            /* -------------------------------------------------------------------------- */
            /*                         RIDER TO CUSTOMER ROUTE                            */
            /* -------------------------------------------------------------------------- */

            if (
              riderLocation &&
              userLocation
            ) {
              start = `${riderLocation.lng},${riderLocation.lat}`;

              end = `${userLocation.lng},${userLocation.lat}`;
            }

            /* -------------------------------------------------------------------------- */
            /*                    RESTAURANT TO CUSTOMER ROUTE                            */
            /* -------------------------------------------------------------------------- */

            else if (
              restaurantLocation &&
              userLocation
            ) {
              start = `${restaurantLocation.lng},${restaurantLocation.lat}`;

              end = `${userLocation.lng},${userLocation.lat}`;
            }

            if (
              !start ||
              !end
            )
              return;

            const res =
              await fetch(
                `https://router.project-osrm.org/route/v1/driving/${start};${end}?overview=full&geometries=geojson`
              );

            const data =
              await res.json();

            const routeCoords =
              data.routes?.[0]
                ?.geometry
                ?.coordinates;

            if (
              !routeCoords
            )
              return;

            const formatted =
              routeCoords.map(
                (
                  coord
                ) => [
                  coord[1],
                  coord[0],
                ]
              );

            setRoute(
              formatted
            );

            setRouteInfo({
              distance:
                (
                  data
                    .routes?.[0]
                    ?.distance /
                  1000
                ).toFixed(
                  1
                ),

              duration:
                Math.ceil(
                  data
                    .routes?.[0]
                    ?.duration /
                    60
                ),
            });
          } catch (error) {
            console.log(
              "Route fetch error:",
              error
            );
          }
        };

      fetchRoute();
    }, [
      riderLocation,
      restaurantLocation,
      userLocation,
    ]);

    return (
      <div className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-xl">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1e5dd] bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900">
              Live Order Tracking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track rider,
              restaurant and
              delivery
              location in
              realtime.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* DISTANCE */}
            {routeInfo.distance && (
              <div className="rounded-full bg-orange-50 px-4 py-2 text-xs font-bold text-orange-600">
                {routeInfo.distance}{" "}
                km
              </div>
            )}

            {/* ETA */}
            {routeInfo.duration && (
              <div className="rounded-full bg-cyan-50 px-4 py-2 text-xs font-bold text-cyan-700">
                ~
                {
                  routeInfo.duration
                }{" "}
                mins
              </div>
            )}

            {/* LIVE */}
            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              LIVE
            </div>
          </div>
        </div>

        {/* MAP */}
        <div style={{ height }}>
          <MapContainer
            center={center}
            zoom={14}
            scrollWheelZoom={
              true
            }
            className="h-full w-full"
            ref={mapRef}
          >
            {/* TILE */}
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* AUTO FIT */}
            <FitBounds
              points={[
                userLocation,
                restaurantLocation,
                riderLocation,
              ]}
            />

            {/* USER */}
            {userLocation && (
              <Marker
                position={[
                  userLocation.lat,
                  userLocation.lng,
                ]}
                icon={
                  userIcon
                }
              >
                <Popup>
                  <div className="min-w-[150px]">
                    <h3 className="font-bold">
                      Customer
                      Location
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Delivery
                      destination
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* RESTAURANT */}
            {restaurantLocation && (
              <Marker
                position={[
                  restaurantLocation.lat,
                  restaurantLocation.lng,
                ]}
                icon={
                  restaurantIcon
                }
              >
                <Popup>
                  <div className="min-w-[150px]">
                    <h3 className="font-bold">
                      Restaurant
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Pickup
                      location
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* RIDER */}
            {riderLocation && (
              <Marker
                position={[
                  riderLocation.lat,
                  riderLocation.lng,
                ]}
                icon={
                  riderIcon
                }
              >
                <Popup>
                  <div className="min-w-[150px]">
                    <h3 className="font-bold">
                      Delivery
                      Rider
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Live rider
                      location
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* ROUTE */}
            {route.length >
              0 && (
              <Polyline
                positions={
                  route
                }
                pathOptions={{
                  color:
                    "#f97316",
                  weight: 6,
                  opacity: 0.9,
                  lineJoin:
                    "round",
                }}
              />
            )}
          </MapContainer>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap items-center gap-4 border-t border-[#f1e5dd] bg-[#fffaf6] px-5 py-4 text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm text-white">
              🏠
            </div>

            Customer
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm text-white">
              🍔
            </div>

            Restaurant
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
              🏍️
            </div>

            Rider
          </div>
        </div>
      </div>
    );
  };

export default LiveOrderTrackingMap;