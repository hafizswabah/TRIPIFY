import Mongoose from "mongoose";
import { type } from "os";
const PackageSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    visitPlaces: {
        type: String,
        required: true
    },
    totalSlots: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    mainImage: {
        type: Object,
        required: true
    }, subImages: {
        type: Object,
        required: true
    }, active: {
        type: Boolean,
        default: true
    }, agencyId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    }, flightbooking: {
        type: Boolean,
        default: false
    }, staybooking: {
        type: Boolean,
        default: false
    }, bookingDeatails: {
        type: Array,
        default: []
    }

})
const PackageModel = Mongoose.model("Packages", PackageSchema)
export default PackageModel