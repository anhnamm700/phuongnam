require('dotenv').config();
import nodemailer from "nodemailer";

const sendSimpleEmail = async(reciverEmail, product, id) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.MAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <namdohoai997@gmail.com>', // sender address
    to: reciverEmail, // list of receivers
    subject: "Phương Nam Store", // Subject line
    text: `Đơn hàng ${id}`, // plain text body
    html: `<b>Cảm ơn bạn đã đặt sản phẩm ${product} của chúng tôi! Chúng tôi sẽ giao hàng nhanh nhất đến cho bạn!</b>`, // html body 
  });
}



module.exports = {
    sendSimpleEmail
}