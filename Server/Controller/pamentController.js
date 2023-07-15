import Razorpay from 'razorpay'
import crypto from 'crypto'
import BookingModel from '../Model/BookingModel.js';
import PackageModel from '../Model/packageModel.js';
import PlanModel from '../Model/PlanModal.js';
import PlanBookingModel from '../Model/PlanBookModel.js';

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function paymentOrder(req, res) {
    try {
        const { totalCost } = req.body;

        var options = {
            amount: totalCost * 100,  // amount in the smallest currency unit
            currency: "INR",
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err)
                res.json({ err: true, message: "server error" })
            } else {
                res.json({ err: false, order })
            }
        });
    } catch (error) {
        res.json({ err: true, message: "server error", error })
    }

}

export async function verifyPayment(req, res) {
    try {

        const {
            response, BookedSlots, PackageId, AgencyId, userId

        } = req.body;
  

        let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === response.razorpay_signature) {
            let bookingData = {
                payment: response,
                BookedSlots,
                PackageId,
                AgencyId,
                userId
            };
    
            const booking = await BookingModel.create(bookingData);
            const packageUpdate = await PackageModel.findByIdAndUpdate(PackageId,
                { $inc: { balanceSlot: - BookedSlots } })

            return res.json({
                err: false, booking
            })
        } else {
            return res.json({
                err: true, message: "payment verification failed"
            })
        }


    } catch (error) {
        console.log(error)
        res.json({ error, err: true, message: "somethin went wrong" })
    }

}
export async function PlanverifyPayment(req, res) {
    try {

        const {
            response, BookedSlots, PlanId, AgencyId, userId

        } = req.body;


        let body = response.razorpay_order_id + "|" + response.razorpay_payment_id;

        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === response.razorpay_signature) {
            let bookingData = {
                payment: response,
                BookedSlots,
                PlanId,
                AgencyId,
                userId
            };
 
            const booking = await PlanBookingModel.create(bookingData);
            const planUpdate = await PlanModel.findByIdAndUpdate(PlanId,
                { $inc: { balanceSlot: - BookedSlots } })

            return res.json({
                err: false, booking
            })
        } else {
            return res.json({
                err: true, message: "payment verification failed"
            })
        }


    } catch (error) {
        console.log(error)
        res.json({ error, err: true, message: "somethin went wrong" })
    }

}