import { create } from "zustand";
import getCurrentLocation from "../utils/getCurrentLocation";
import api from "../config/api";

const useUiStore = create((set, get) => ({
  showHeaderMenu: false,
  mobileOper: false,
  location: {
    lat: null,
    lon: null,
    name: "",
    address: {
      city: "",
      state: "",
      country: "",
      pin: "",
    },
  },
  isFetchingLocation: false,
  restaurants: [],
  activeOrders: [],
  likedRestaurants: JSON.parse(localStorage.getItem("likedRestaurants")) || [],
  likedMenus: JSON.parse(localStorage.getItem("likedMenus")) || [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  cartRestaurant: JSON.parse(localStorage.getItem("cartRestaurant")) || null,
  showClearCartConfirmation: false,

  setShowClearCartConfirmation: (val) => {
    set({ showClearCartConfirmation: val });
  },

  addToCart: (item) => {
    const cartRestaurant = get().cartRestaurant;
    const restaurants = get().restaurants;

    const restaurant = restaurants.find((r) => r._id === item.restaurant);

    if (cartRestaurant && item.restaurant !== cartRestaurant?._id) {
      set({ showClearCartConfirmation: true });
      return;
    }

    console.log({ cartRestaurant, item, restaurant });

    const cart = get().cart;

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === item._id,
    );
    let updatedCart;
    if (existingItemIndex !== -1) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    set({ cart: updatedCart, cartRestaurant: restaurant });
  },

  removeFromCart: (item) => {
    const cart = get().cart;
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === item._id,
    );
    if (existingItemIndex !== -1) {
      let updatedCart = [...cart];
      if (updatedCart[existingItemIndex].quantity > 1) {
        updatedCart[existingItemIndex].quantity -= 1;
      } else {
        updatedCart.splice(existingItemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      set({ cart: updatedCart });
    }
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartRestaurant");
    set({ cart: [], cartRestaurant: null });
  },

  likeMenu: (menu) => {
    const saved = get().likedMenus;
    const isAlreadySaved = saved.some((m) => m._id === menu._id);
    let updatedSaved;
    if (isAlreadySaved) {
      updatedSaved = saved.filter((m) => m._id !== menu._id);
    } else {
      updatedSaved = [...saved, menu];
    }
    localStorage.setItem("likedMenus", JSON.stringify(updatedSaved));
    set({ likedMenus: updatedSaved });
  },

  likeRestaurant: (restaurant) => {
    const saved = get().likedRestaurants;
    const isAlreadySaved = saved.some((r) => r._id === restaurant._id);
    let updatedSaved;
    if (isAlreadySaved) {
      updatedSaved = saved.filter((r) => r._id !== restaurant._id);
    } else {
      updatedSaved = [...saved, restaurant];
    }
    localStorage.setItem("likedRestaurants", JSON.stringify(updatedSaved));
    set({ likedRestaurants: updatedSaved });
  },
  fetchRestaurants: async () => {
    const location = get().location;
    try {
      if (!location?.lat || !location?.lon) return;
      const response = await api.get("/public/restaurant/nearby", {
        params: {
          lat: location?.lat,
          lon: location?.lon,
        },
      });
      set({ restaurants: response.data.data });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  },
  fetchCurrentLocation: async () => {
    set({ isFetchingLocation: true });
    const result = await getCurrentLocation();
    const loc = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${result.data.lat}&lon=${result.data.lon}`,
    );
    const locationData = await loc.json();

    set({
      location: {
        lat: result.data.lat,
        lon: result.data.lon,
        name: locationData.display_name,
        address: {
          city: locationData.address.city,
          state: locationData.address.state,
          country: locationData.address.country,
          pin: locationData.address.postcode || "",
        },
      },
      isFetchingLocation: false,
    });
  },
  setLocation: async (loc) => {
    try {
      const location = get().location;
      const locationData = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${loc.lat}&lon=${loc.lon}`,
      );
      const locationJson = await locationData.json();
      set({
        location: {
          ...location,
          lat: loc.lat,
          lon: loc.lon,
          name: locationJson.display_name,
          address: locationJson.address,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  setShowHeaderMenu: (val) => {
    set({ showHeaderMenu: val });
  },
  setMobileOpen: (val) => {
    set({ mobileOpen: val });
  },
  setActiveOrders: (orders) => {
    set({ activeOrders: orders });
  },
}));

export default useUiStore;
