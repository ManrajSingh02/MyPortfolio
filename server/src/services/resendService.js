export const sendPortfolioEmail = async ({
  name,
  email,
  subject,
  message,
  html,
}) => {
  if (!process.env.RESEND_API_KEY) {
    const error = new Error("RESEND_API_KEY is missing.");
    error.status = 500;
    throw error;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Portfolio <onboarding@resend.dev>",

      to: [process.env.RESEND_TO_EMAIL],

      reply_to: email,

      subject: subject || `Portfolio enquiry from ${name}`,

      text: `
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
      `,

      html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error(data);

    const error = new Error(
      data.message || "Unable to send email."
    );

    error.status = response.status;

    throw error;
  }

  return data;
};