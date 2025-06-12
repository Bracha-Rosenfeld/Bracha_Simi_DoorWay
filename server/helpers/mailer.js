// mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR_EMAIL@gmail.com", // כתובת המייל שממנה נשלח
    pass: "YOUR_APP_PASSWORD",    // סיסמת אפליקציה (ולא הסיסמה הרגילה!)
  },
});

function sendApprovalEmail(toEmail, apartmentTitle) {
  const mailOptions = {
    from: "YOUR_EMAIL@gmail.com",
    to: toEmail,
    subject: "האישור לפרסום הדירה שלך התקבל!",
    text: `שלום! הדירה שלך "${apartmentTitle}" אושרה לפרסום באתר. תודה על השימוש!`,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendApprovalEmail;
