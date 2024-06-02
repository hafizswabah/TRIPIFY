import multer from 'multer'
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+".jpg")
    }
})



const multerUpload = multer({
    storage: storage
})

export default multerUpload