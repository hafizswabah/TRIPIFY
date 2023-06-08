
import nodemailer from 'nodemailer'

export default function sentOtp(email, otp){
    return new Promise((resolve, reject)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: "swabah.a.avd121@gmail.com",
              pass: "bwdyhuqvdgyvscrd",
            },
          });
      
            var mailOptions={
              from: "swabah.a.avd121@gmail.com",
              to: email,
              subject: "Tripify EMail Verification",
              html: `<h1>verifify Your Email for Tripify </h1>
              <h2>Here the OTP to verify your Tripify account</h2>
              <h2>${otp}</h2>`,
            }
        
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("error", error, info)
                reject(error)

              } else {
                console.log("success") 
                resolve({success:true, message:"Email sent successfull"})
              }
            });
    })
}
