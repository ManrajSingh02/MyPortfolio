const API_URL = `${import.meta.env.VITE_API_URL}/contact`;

export const sendContactMessage = async (contactData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send message.");
  }

  return data;
};