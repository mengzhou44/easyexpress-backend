const nodemailer = require("nodemailer");
const { createSendMessage } = require("./create-send-message");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SYSTEM_EMAIL,
    pass: process.env.SYSTEM_EMAIL_PASSWORD
  }
});


const sendMail = function(mailOptions, onError, onSuccess) {
  mailOptions.html = createSendMessage(mailOptions.body);
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      onError(error);
    } else {
      onSuccess(info.response);
    }
  });
};

const sendSystemMail = function(mailOptions, onError, onSuccess) {
 
  mailOptions.html = createSendMessage(mailOptions.body);
  mailOptions.from = process.env.SYSTEM_EMAIL;
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        onError(error);
      } else {
        onSuccess(info.response);
      }
    });
};

module.exports = {
  sendMail,
  sendSystemMail
};
