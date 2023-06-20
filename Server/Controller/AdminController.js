import AgencyModel from '../Model/AgencyModel.js'
import sentMail from '../helper/sentMail.js'
import UserModel from '../Model/UserModel.js'

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
        console.log(users);
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
    console.log(req.body);
    let unblock = await UserModel.updateOne({ email }, { block: false })
    res.json({ err: false, message: "unblocked" })
}