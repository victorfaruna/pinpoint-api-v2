import nodemailer from 'nodemailer';

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  text: string;
  subject: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME, // Your Gmail address
      pass: process.env.GMAIL_PASSWORD, // Your Gmail App Password
    },
  });
  const mailOptions = {
    from: 'emiracegroup@example.com',
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};
