
import BookingModel from '../Model/BookingModel.js';
import PackageModel from '../Model/packageModel.js'
import PlanBookingModel from '../Model/PlanBookModel.js';
import PlanModel from '../Model/PlanModal.js'
import UserModel from '../Model/UserModel.js'

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
  const PlanBookings = await PlanBookingModel.find({ userId: userId }).populate('PlanId')
  res.json({ err: false, bookings, PlanBookings })
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
export async function findPackages(req, res) {
  const category = req.query.category;
  const plan = req.query.plan;

  if (plan) {
    try {
      if (plan === 'all') {
        const plans = await PlanModel.find().lean();
        return res.json({ err: false, plans, pkg: false });
      }
      const plans = await PlanModel.find({ category: plan }).exec();
      return res.json({ err: false, plans, pkg: false });
    } catch (error) {
      return res.json({ err: true, message: 'Error retrieving plans' });
    }
  }

  try {
    if (category === 'all') {
      const packages = await PackageModel.find().lean();
      return res.json({ err: false, packages, pkg: true })
    }
    const packages = await PackageModel.find({ category: category }).exec();
    return res.json({ err: false, packages, pkg: true });
  } catch (error) {
    return res.json({ err: true, message: 'Error retrieving packages' });
  }
}
export async function editProfile(req,res){
  console.log(req.body);
  let {_id}=req.body
  let name=req.body.userName
  let email=req.body.userEmail
  let contact=req.body.userContact
  let user=await UserModel.findByIdAndUpdate(_id,{
    name:name,
    email:email,
    contact:contact
  })
  res.json({err:false,message:"profile Updated Successfully"})
}
export async function checkReviewer(req,res){
  let userId=req.query.userId
  let PackageId=req.query.PackageId
  console.log(req.query);
  let booking=await BookingModel.findOne({UserId:userId,PackageId:PackageId})
  console.log(booking);



}