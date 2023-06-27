import PackageModel from '../Model/packageModel.js'
import PlanModel from '../Model/PlanModal.js'
export async function GetPkg(req, res) {
    let packages = await PackageModel.find().limit(4).lean()
    res.json({ err: false, packages })
}


export async function searchPkg(req, res) {
    console.log(req.query);
    const key = req.query.key ?? "";
    const category = req.query.category ?? "";
    const plan = req.query.plan ?? "";
    const packages = await PackageModel.find({ category: new RegExp(category, 'i'), name: new RegExp(key, 'i') });
    console.log(packages);
    if (packages != []) {
        return res.json({ pkg: true, packages })
    } else {

        const plans = await PlanModel.find({ category: new RegExp(plan, 'i') })
        return res.json({ pkg: false, plans })
    }

}