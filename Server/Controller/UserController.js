import BookingModel from '../Model/BookingModel.js';
import PackageModel from '../Model/packageModel.js'
import PlanModel from '../Model/PlanModal.js'

export async function GetPkg(req, res) {
    let packages = await PackageModel.find().limit(4).lean()
    res.json({ err: false, packages })
}
export async function searchPkg(req, res) {
   const packages = await PackageModel.find().lean();
  console.log('location search get all pkk');
  return res.json({ packages });
}
export async function packageview(req, res) {
    const _id = req.params.id
    const packages = await PackageModel.findOne({ _id })

    res.json({ err: false, packages })
}

export async function planview(req, res) {
    const _id = req.params.id
    const plans = await PlanModel.findOne({ _id })
    res.json({ err: false, plans })
}
export async function getuserBooking(req, res) {
    const userId = req.params.id
    const bookings = await BookingModel.find({ userId: userId }).populate('PackageId');
    res.json({ err: false, bookings })
}
export async function cancelBooking(req, res) {
    try {
        const { bookingId } = req.body;
        await BookingModel.updateOne({
            _id: bookingId
        }, {
            $set: {
                status: "refund processing",
                time: new Date(new Date(0).setFullYear(0))
            }
        })
        return res.json({
            err: false
        })
    } catch (error) {
        res.json({ err: true, error, message: "something went wrong" })
    }
}
export async function findPackages(req,res){
    let category=req.query.category
   let packages=await PackageModel.find({category:category})

   return res.json({err:false,packages})
}