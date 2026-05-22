// models/Restaurant.js

import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: [
      {
        type: String,
      },
    ],

    description: {
      type: String,
      default: "",
    },

    coverImage: {
      url: String,
      publicId: String,
    },

    image: {
      url: String,
      publicId: String,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    pin: {
      type: String,
    },

    geoLocation: {
      type: {
        type: String,

        enum: ["Point"],

        default: "Point",
      },

      coordinates: {
        type: [Number],
      },
    },

    documents: {
      gst: {
        type: String,
      },

      fssai: {
        type: String,
      },
    },

    paymentDetails: {
      upiId: String,

      accountHolderName: String,

      accountNumber: String,

      ifscCode: String,
    },

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isOpen: {
      type: Boolean,
      default: false,
      default: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

restaurantSchema.index({ geoLocation: "2dsphere" });

export default Restaurant;
