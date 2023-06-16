import Mongoose from "mongoose";
const AgencySchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    regNo: {
        type: String,
        required: true
    }, proof: {
        type: Object,
        required: true
    }, active: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: Boolean,
        default: false,
    },
    rejectedMessage: {
        type: String,
        default: ""
    },
})
const AgencyModel = Mongoose.model("Agency", AgencySchema)
export default AgencyModel