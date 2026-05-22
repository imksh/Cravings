import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    rider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    items: [
      {
        menu: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },

        quantity: Number,

        price: Number,
      },
    ],

    deliveryAddress: {
      title: String,
      address: String,
      city: String,
      pin: String,

      geoLocation: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },

        coordinates: [Number],
      },
    },

    restaurantLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "upi", "card"],
      default: "cod",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    status: {
      type: String,
      enum: [
        "placed",
        "confirmed",
        "preparing",
        "ready",
        "picked",
        "delivered",
        "cancelled",
      ],
      default: "placed",
    },

    subtotal: Number,

    deliveryFee: Number,

    tax: Number,

    total: Number,
  },
  {
    timestamps: true,
  },
);

orderSchema.index({ orderId: 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
