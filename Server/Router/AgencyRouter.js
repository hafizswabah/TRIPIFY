import  express  from "express";
import { acitvatePackage, acitvatePlan, addPackage, addPlan, deacitvatePackage, deacitvatePlan, deletePackage, deletePlan, editPackage, editPlan, getBookings, getDashboardBookings, getPackages, getPlans, getRefund, refundComplete } from "../Controller/AgencyController.js";
import multerUpload from "../middlewares/multerUpload.js";


const router=express.Router()
router.post("/add-package",multerUpload.fields([{name:'subImages', maxCount:12},{name:'mainImage', maxCount:"1"}]),addPackage)
router.post("/add-plan",multerUpload.fields([{name:'subImages', maxCount:12},{name:'mainImage', maxCount:"1"}]),addPlan)
router.get("/get-packages",getPackages)
router.get("/get-plans",getPlans)
router.post('/active-package',acitvatePackage)
router.post('/deactivate-package',deacitvatePackage)
router.post('/active-plan',acitvatePlan)
router.post('/deactivate-plan',deacitvatePlan)
router.post('/edit-packages',multerUpload.fields([{name:'subImages', maxCount:12},{name:'mainImage', maxCount:"1"}]),editPackage)
router.post('/delete-package',deletePackage)
router.post('/delete-plan',deletePlan)
router.get("/get-bookings",getBookings)
router.get("/dashboard-bookings",getDashboardBookings)
router.get("/refund",getRefund)
router.post("/booking/refund/complete",refundComplete)
router.post('/edit-plan', multerUpload.fields([{ name: 'subImages', maxCount: 12 }, { name: 'mainImage', maxCount: 1 }]), editPlan);
export default router