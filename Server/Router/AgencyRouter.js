import  express  from "express";
import { acitvatePackage, acitvatePlan, addPackage, addPlan, deacitvatePackage, deacitvatePlan, getPackages, getPlans } from "../Controller/AgencyController.js";
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

export default router