var nodemailer = require('nodemailer')
require('dotenv').config();

// const sender = process.env.EMAIL;
// const password = process.env.PASS;

const sendMailer = async (email,token,id)=>{

    console.log("Ok")




    let transporter =  nodemailer.createTransport({
       
        service: 'gmail',
        auth: {
            user: "borasivijaylaxmi2000@gmail.com",
            pass: "llryjjettmztelel"
        }
    })
console.log(2)

let mailOptions = {

    
        from:"borasivijaylaxmi2000@gmail.com",
        to : "vijaylaxmiborasi1526@gmail.com",
        subject : "For password reset.",
        html : `<a href='http://127.0.0.1.3000/api/user/reset/${id}/${token}'>Click on this for reset password, else the link will get expired in 5 days</a>`
    
}

console.log("check")

await transporter.sendMail(mailOptions, (err, info) => {
    console.log("2222")
    if(err){
        console.log(err);
    }else{
        console.log('Email sent successfully' +info.response);

        return true
    }
})


}




module.exports = {
    sendMailer
}
    
