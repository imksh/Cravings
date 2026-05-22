import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      select: false,
    },

    addresses: [
      {
        id: {
          type: String,
          required: true,
          unique: true,
        },
        title: {
          type: String,
          default: "Home",
        },

        name: {
          type: String,
          default: "",
        },

        address: String,

        city: String,
        state: String,
        landmark: String,
        instructions: String,
        pin: String,
        isDefault: {
          type: Boolean,
          default: false,
        },

        geoLocation: {
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
      },
    ],

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
  },
  {
    timestamps: true,
  },
);

customerSchema.index({
  "addresses.geoLocation": "2dsphere",
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
