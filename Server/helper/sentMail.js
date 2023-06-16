import nodemailer from 'nodemailer'

export default function sentMail(email, message1, message2){
    return new Promise((resolve, reject)=>{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.email,
              pass: process.env.password,
            },
          });
      
            var mailOptions={
              from: process.env.email,
              to: email,
              subject: "Tripify",
              html: `
              <h1>Tripify</h1>
                <h2>${message1}</h2>
                <h3>${message2}</h3>
              `,
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
