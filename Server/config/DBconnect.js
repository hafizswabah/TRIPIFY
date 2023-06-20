import Mongoose from 'mongoose'
function DBConnect(){
Mongoose.connect(process.env.DBConnection)
.then(()=>{console.log('DB Connected');})
.catch((err)=>{console.log('db error :',err);})
}
export default DBConnect