import PackageModel from "../Model/packageModel.js";
import PlanModel from "../Model/PlanModal.js"
export async function addPackage(req, res) {
    console.log(req.body);
    console.log(req.files)
    let mainImage = req.files.mainImage
    let subImages = req.files.subImages
    let Package = await PackageModel.create({ ...req.body, mainImage, subImages })
    res.json({ err: false, message: "package added succesfully" })
}

export async function addPlan(req, res) {
    console.log(req.body);
    console.log(req.files)
    let mainImage = req.files.mainImage
    let subImages = req.files.subImages
    let Plan = await PlanModel.create({ ...req.body, mainImage, subImages })
    res.json({ err: false, message: "plan added succesfully" })
}
export async function getPackages(req, res) {
    let packages = await PackageModel.find().lean()
    res.json({ err: false, packages })
}
export async function getPlans(req, res) {
    let plans = await PlanModel.find().lean()
    res.json({ err: false, plans })
}
export async function acitvatePackage(req, res) {
    let _id = req.body.id
    console.log(_id);
    let activate = await PackageModel.findByIdAndUpdate(_id, { active: true })
    res.json({err:false,message:"activated"})
}
export async function deacitvatePackage(req, res) {
    let _id = req.body.id
    let activate = await PackageModel.findByIdAndUpdate(_id, { active:false })
    res.json({err:false,message:"activated"})
}
export async function acitvatePlan(req, res) {
    let _id = req.body.id
    console.log(_id);
    let activate = await PlanModel.findByIdAndUpdate(_id, { active: true })
    res.json({err:false,message:"activated"})
}
export async function deacitvatePlan(req, res) {
    let _id = req.body.id
    let activate = await PlanModel.findByIdAndUpdate(_id, { active:false })
    res.json({err:false,message:"activated"})
}