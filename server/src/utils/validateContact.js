const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContact = (body = {}) => {
  const contact = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    subject: String(body.subject || '').trim(),
    message: String(body.message || '').trim()
  };

  if (!contact.name || !EMAIL_PATTERN.test(contact.email) || !contact.message) {
    const error = new Error('Please provide a valid name, email, and message.');
    error.status = 400;
    throw error;
  }

  if (contact.name.length > 100 || contact.email.length > 254 || contact.subject.length > 200 || contact.message.length > 5000) {
    const error = new Error('One or more fields are too long.');
    error.status = 400;
    throw error;
  }

  return contact;
};
