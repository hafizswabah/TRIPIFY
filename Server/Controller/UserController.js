import BookingModel from '../Model/BookingModel.js';
import PackageModel from '../Model/packageModel.js'
import PlanModel from '../Model/PlanModal.js'

export async function GetPkg(req, res) {
    let packages = await PackageModel.find().limit(4).lean()
    res.json({ err: false, packages })
}


export async function searchPkg(req, res) {
    const key = req.query.key ?? "";
    const category = req.query.category ?? "";
    const plan = req.query.plan ?? "";
    if (plan) {
        const plans = await PlanModel.find({ category: new RegExp(plan, 'i'), name: new RegExp(key, 'i') })
        return res.json({ pkg: false, plans })
    }

    const packages = await PackageModel.find({ category: new RegExp(category, 'i'), name: new RegExp(key, 'i') });
    return res.json({ pkg: true, packages })
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
    res.json({ err: false, bookings})
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
