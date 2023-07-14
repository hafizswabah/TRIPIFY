import PackageModel from "../Model/packageModel.js";
import PlanModel from "../Model/PlanModal.js"

export async function addPackage(req, res) {
    try {
        console.log(req.body);
        const { dayDetails, agencyId, ...otherData } = req.body;
        const parsedDayDetails = JSON.parse(dayDetails);
        const mainImage = req.files.mainImage;
        const subImages = req.files.subImages;
        let coordinates=JSON.parse(req.body['location.coordinates'])
        const packageData = { ...otherData, agencyId, mainImage, subImages, dayDetails: parsedDayDetails, location:{type:"Point",coordinates:[coordinates[0], coordinates[1]]} };
        const packages = await PackageModel.create(packageData);
        res.json({ err: false, message: 'Package added successfully' });
    } catch (error) {
        console.error(error);
        res.json({ err: true, message: 'Error adding package' });
    }
}

export async function editPackage(req, res) {

    console.log('REQ', req.body);
    console.log(req.files)
}
export async function addPlan(req, res) {
    console.log(req.body);
    let mainImage = req.files.mainImage
    let subImages = req.files.subImages
let eventDetails=req.body.programmeDetails
let parsedEventDetails=JSON.parse(eventDetails)
    let Plan = await PlanModel.create({ ...req.body, mainImage, subImages,ProgrammeDetails:parsedEventDetails })
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
    let _id = req.body.id``
    let activate = await PackageModel.findByIdAndUpdate(_id, { active: true })
    res.json({ err: false, message: "activated" })
}
export async function deacitvatePackage(req, res) {
    let _id = req.body.id
    let activate = await PackageModel.findByIdAndUpdate(_id, { active: false })
    res.json({ err: false, message: "activated" })
}
export async function acitvatePlan(req, res) {
    let _id = req.body.id
    console.log(_id);
    let activate = await PlanModel.findByIdAndUpdate(_id, { active: true })
    res.json({ err: false, message: "activated" })
}
export async function deacitvatePlan(req, res) {
    let _id = req.body.id
    let activate = await PlanModel.findByIdAndUpdate(_id, { active: false })
    res.json({ err: false, message: "activated" })
}
export async function deletePackage(req, res) {
    let _id = req.body.id
    await PackageModel.findByIdAndDelete({ _id })
    res.json({ err: false, message: "deleted" })
}
export async function deletePlan(req, res) {
    let _id = req.body.id
    await PlanModel.findByIdAndDelete({ _id })
    res.json({ err: false, message: "deleted" })
}