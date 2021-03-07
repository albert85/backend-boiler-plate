/* eslint-disable no-console */
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = async ({
  receiver, subject, text, html,
}) => {
  const message = {
    from: process.env.GMAIL_ADDRESS, // Sender address
    to: receiver, // List of recipients as array
    subject, // Subject line
    text, // Plain text body
    html,
  };

  transporter.sendMail(message);
};

export default sendMail;
