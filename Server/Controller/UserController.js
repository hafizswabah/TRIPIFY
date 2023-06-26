import PackageModel from '../Model/packageModel.js'
export async function GetPkg(req, res) {
    let packages = await PackageModel.find().limit(4).lean()
    res.json({ err: false, packages })
}


export  async function searchPkg(req, res) {
console.log('hhh');
    const query = req.query.query;
    const packages = await PackageModel.find({ name: { $regex: new RegExp(query, 'i') } });
    console.log(packages,'pkg');
    res.json({ err: false, packages })
}