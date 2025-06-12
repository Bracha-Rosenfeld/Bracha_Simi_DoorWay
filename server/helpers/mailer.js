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

exports.sendVerificationEmail = async (toEmail, token) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: toEmail,
    subject: "Verify your email",
    text: `Hello, please verify your email by clicking on the following link: http://localhost:5173/verify-email?token=${token}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Failed to send verification email: " + error.message);
  }
}
exports.sendResetPasswordEmail = async (toEmail, token) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: toEmail,
    subject: "Reset your password",
    text: `Hello, please reset your password by clicking on the following link: http://localhost:5173/reset-password?token=${token}`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Failed to send reset password email: " + error.message);
  }
};
exports.sendNewApartmentEmail = async (toEmail, username,apartmentTitle) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: toEmail,
    subject: "New apartment created",
    text: `Dear ${username},

Thank you for submitting your apartment listing to our platform!

We have successfully received the details of your apartment titled "${apartmentTitle}". Your submission is now under review and is pending approval by our team.

You will receive a confirmation email as soon as your apartment is approved and published.

If you have any questions or need to make changes, feel free to contact us at ${process.env.APP_EMAIL}.

Best regards,  
The DoorWay Team
`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Failed to send new apartment email: " + error.message);
  }
};

exports.sendApprovalEmail = async (toEmail,username ,apartmentTitle,type) => {
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: toEmail,
    subject: "your apartment has been approved",
    text: `Dear ${username},

Great news! Your apartment listing titled "${apartmentTitle}" has been reviewed and successfully approved.

It is now live and visible to potential ${type=='rent'? 'reters' : 'buyers'} on our platform.

Thank you for choosing to list your apartment with us.  
We wish you the best of luck in finding the perfect tenant!

If you have any questions or need assistance, feel free to reach out at ${process.env.APP_EMAIL}.

Best regards,  
The DoorWay Team
`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw new Error("Failed to send approval email: " + error.message);
  }
};
