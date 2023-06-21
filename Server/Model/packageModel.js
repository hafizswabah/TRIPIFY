import Mongoose from "mongoose";
const PackageSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
     visitPlaces: {
        type: Object,
        required: true
    },
     totalSlots: {
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
    fromDate: {
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
    }, subImage: {
        type: Object,
        required: true
    }, active: {
        type: Boolean,
        default: false
    }
 
})
const PackageModel = Mongoose.model("Packages", PackageSchema)
export default PackageModel