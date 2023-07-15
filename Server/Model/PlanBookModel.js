import mongoose from "mongoose"

const schema = new mongoose.Schema({

    PlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plans'
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    AgencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    },
    payment: {
        type: Object,
        default: {}
    },
    BookedSlots: {
        type: Number,
        required: true
    },
    
    status: {
        type: String,
        default: "upcoming"
    }
}, { timestamps: true })

const PlanBookingModel = mongoose.model("PlanBookings", schema)
export default PlanBookingModel