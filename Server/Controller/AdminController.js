import AgencyModel from '../Model/AgencyModel.js'
import sentMail from '../helper/sentMail.js'
import UserModel from '../Model/UserModel.js'
import PlanModal from '../Model/PlanModal.js'
import PackageModel from '../Model/packageModel.js'
import PlanBookingModel from '../Model/PlanBookModel.js'
import BookingModel from '../Model/BookingModel.js'
export async function getAgencyRequests(req, res) {
    try {
        const Agencies = await AgencyModel.find({ active: false, rejected: { $ne: true } }).lean()
        res.json({ err: false, Agencies })
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err: true })
    }
}
export async function acceptAgency(req, res) {
    try {
        const { email } = req.body;
        await AgencyModel.updateOne({ email }, { active: true });
        res.json({ err: false })
        await sentMail(email, 'Tripify has approved your request for registration', 'You can proceed to your account')
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err: true })
    }
}
export async function rejectAgency(req, res) {
    try {
        const { email } = req.body;
        await AgencyModel.updateOne({ email }, { active: false, rejected: true });

        res.json({ err: false })
        await sentMail(email, 'Tripify has rejected your request for registration', 'Please try again sometimes')
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err: true })
    }
}
export async function getAgencies(req, res) {
    try {
        const Agencies = await AgencyModel.find({ active: true, rejected: { $ne: true } }).lean()
        res.json({ err: false, Agencies })
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err: true })
    }
}
export async function getUsers(req, res) {
    try {
        const users = await UserModel.find().lean()
        res.json({ err: false, users })
    }
    catch (err) {
        res.json({ message: "somrthing went wrong", error: err, err: true })
    }
}
export async function blockUser(req, res) {
    let { email } = req.body
    let blockUser = await UserModel.updateOne({ email }, { block: true })
    res.json({ err: false, message: "blocked sucfcesfully" })
}
export async function unblock(req, res) {
    let { email } = req.body
    let unblock = await UserModel.updateOne({ email }, { block: false })
    res.json({ err: false, message: "unblocked" })
}
export async function getPlans(req, res) {
    let plans = await PlanModal.find().lean()
    res.json({ err: false, plans })
}
export async function getPackages(req, res) {
    let packages = await PackageModel.find().populate("agencyId")

    res.json({ err: false, packages })
}
export async function getBookings(req, res) {
    try {
        const PlanBookings = await PlanBookingModel.find().populate("PlanId").populate("userId").populate("AgencyId")
        const bookings = await BookingModel.find().populate("PackageId").populate("userId").populate("AgencyId")

        res.json({ err: false, bookings, PlanBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: "Failed to fetch bookings" });
    }
}

export async function report(req, res) {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    let currentDate = new Date()
    const completedTrips = await BookingModel.aggregate([
        {
            $match: {
                status: "upcoming",
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            },
        },
        {
            $lookup: {
                from: "packages",
                localField: "PackageId",
                foreignField: "_id",
                as: "packages",
            },
        },
        {
            $lookup: {
                from: "agencies",
                localField: "AgencyId",
                foreignField: "_id",
                as: "agency",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $match: {
                "packages.endDate": { $lt: currentDate },
            },
        },
    ]).exec();
    const completedPlans = await PlanBookingModel.aggregate([
        {
            $match: {
                status: "upcoming",
                createdAt: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                },
            },
        },
        {
            $lookup: {
                from: "plans",
                localField: "PlanId",
                foreignField: "_id",
                as: "plans",
            },
        },
        {
            $lookup: {
                from: "agencies",
                localField: "AgencyId",
                foreignField: "_id",
                as: "agency",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $match: {
                "plans.date": { $lt: currentDate },
            },
        },
    ]).exec();
    console.log(completedPlans);
   

    res.json({ err: false, completedTrips,completedPlans })

    // Rest of your code...
}