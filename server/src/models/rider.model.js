import mongoose from "mongoose";

const riderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vehicleType: {
      type: String,
      enum: ["bike", "scooty", "cycle"],
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },

    documents: {
      dl: {
        type: String,
        required: true,
      },

      rc: {
        type: String,
        required: true,
      },

      aadhaar: {
        type: String,
        required: true,
      },

      pan: {
        type: String,
      },
    },

    currentLocation: {
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

    isAvailable: {
      type: Boolean,
      default: false,
    },

    totalDeliveries: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

riderSchema.index({ currentLocation: "2dsphere" });

const Rider = mongoose.model("Rider", riderSchema);

export default Rider;
