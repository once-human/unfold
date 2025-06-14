import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    secure: true, // <-- IMPORTANT: If using port 465, SSL is required
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: `"Your Company Name" <${process.env.SMTP_MAIL}>`, // <-- optional but better format
    to: email,
    subject: subject,
    html: message,
  };

  try {
    await transporter.sendMail(options);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error("Failed to send email");
  }
};
