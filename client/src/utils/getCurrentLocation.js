
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        success: false,
        message:
          "Geolocation is not supported by this browser.",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          resolve({
            success: true,

            data: {
              lat: latitude,
              lon: longitude,
            },
          });
        } catch (error) {
          reject({
            success: false,
            message:
              "Failed to fetch current location.",
          });
        }
      },

      (error) => {
        let message =
          "Unable to retrieve location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location permission denied.";
            break;

          case error.POSITION_UNAVAILABLE:
            message =
              "Location information unavailable.";
            break;

          case error.TIMEOUT:
            message =
              "Location request timed out.";
            break;

          default:
            message =
              "An unknown location error occurred.";
        }

        reject({
          success: false,
          message,
        });
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};

export default getCurrentLocation;