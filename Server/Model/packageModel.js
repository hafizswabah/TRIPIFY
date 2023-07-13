import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
  duration: {
    type: String,
    required: true,
  },
  visitPlaces: {
    type: String,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
  },
  balanceSlot: {
    type: Number,
    default: function() {
      return this.totalSlots;
    }
  },
  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  mainImage: {
    type: Object,
    required: true,
  },
  subImages: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
  },
  flightbooking: {
    type: Boolean,
    default: false,
  },
  staybooking: {
    type: Boolean,
    default: false,
  },
  bookingDetails: {
    type: Array,
    default: [],
  },
  dayDetails: [{
    day: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  }],
});

const PackageModel = mongoose.model("Packages", PackageSchema);
export default PackageModel;
