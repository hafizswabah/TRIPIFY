import mongoose from 'mongoose'
const feedbackSchema=new mongoose.Schema({
    PackageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Packages',
    
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    PlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plans'
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
},{ timestamps: true })


const feedbackModel = mongoose.model("feedback", feedbackSchema)
export default feedbackModel