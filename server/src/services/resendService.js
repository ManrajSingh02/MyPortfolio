export const sendPortfolioEmail = async ({ name, email, subject, message }) => {
  if (!process.env.RESEND_API_KEY) {
    const error = new Error('Email service is not configured.');
    error.status = 500;
    throw error;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      to: [process.env.RESEND_TO_EMAIL || 'singhmani5995@gmail.com'],
      reply_to: email,
      subject: subject || `Portfolio enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  });

  if (!response.ok) {
    const details = await response.text();
    console.error('Resend error:', details);
    const error = new Error('Email could not be sent. Please try again.');
    error.status = 502;
    throw error;
  }
};
