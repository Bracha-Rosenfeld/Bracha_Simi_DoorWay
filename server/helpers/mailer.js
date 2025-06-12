const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

exports.sendApprovalEmail = async (toEmail, apartmentTitle) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: toEmail,
    subject: "your apartment has been approved",
    text: `Hello, Your apartment titled "${apartmentTitle}" has been approved!`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Failed to send approval email: " + error.message);
  }
};