const nodemail = require('nodemailer')

const sendMail = async(req, res) =>{
    let testAccount = await nodemail.createTestAccount();
    let transport = await nodemail.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'dimitri.hodkiewicz15@ethereal.email',
            pass: 'RqudeNJXndmSbjke8H'
        },
    });
    let info = await transport.sendMail({
        from: '"Vinay 👻" <vinay@example.com>', // sender address
        to: "kumarvinay96419@gmail.com", // list of receivers
        subject: "Change Password", // Subject line
        text: `Hello`, // plain text body
        html:'<p> Hii, Here you can reset your password <a href="localhost:5000/reset-password?token=>reset your password</a>', // html body
    });
    console.log("Mail has been Sent", info.response);
    res.json(info)

}
 
module.exports = sendMail