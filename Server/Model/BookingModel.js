import mongoose from "mongoose"

const schema = new mongoose.Schema({
    PackageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packages',
    
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
    totalCost:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        default: "upcoming"
    }
}, { timestamps: true })

const BookingModel = mongoose.model("Booking", schema)
export default BookingModel