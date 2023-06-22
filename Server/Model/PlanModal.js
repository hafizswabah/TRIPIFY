import Mongoose from "mongoose";
import { type } from "os";
const PlanSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
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
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
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
    }

})
const PlanModel = Mongoose.model("Plans", PlanSchema)
export default PlanModel