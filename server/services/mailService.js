import nodemailer from 'nodemailer';

export const sendContactEmail = async (message) => {
  if (!process.env.MAIL_HOST || !process.env.CONTACT_TO) return;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: process.env.MAIL_USER ? { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS } : undefined
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER || message.email,
    to: process.env.CONTACT_TO,
    replyTo: message.email,
    subject: `Portfolio message from ${message.name}`,
    text: `${message.name} (${message.email})\n\n${message.message}`
  });
};
