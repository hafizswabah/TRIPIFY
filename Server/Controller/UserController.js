import PackageModel from '../Model/packageModel.js'
export async function GetPkg(req, res) {
    let packages = await PackageModel.find().limit(4).lean()
    res.json({ err: false, packages })
}


export  async function searchPkg(req, res) {
    const key = req.query.key ?? "";
    const category = req.query.category ?? "";
    const packages = await PackageModel.find({ category:new RegExp(category, 'i') , name: new RegExp(key, 'i')});
    res.json({ err: false, packages })
}