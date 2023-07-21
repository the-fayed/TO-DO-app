const nodemailer = require(`nodemailer`);

module.exports = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.HOST,
      service: process.env.SERVICE,
      // port: Number(process.env.EMAIL_PORT),
      // secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SENDER,
        pass: process.env.SENDER_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SENDER,
      to: email, // list of receivers
      subject: subject,
      html: html,
    });
    console.log(`email sent successfully`);
  } catch (error) {
    console.log(`email not sent`);
    console.log(error);
  }
};
