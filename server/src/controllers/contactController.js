import { sendPortfolioEmail } from '../services/resendService.js';
import { validateContact } from '../utils/validateContact.js';

export const sendContactMessage = async (request, response, next) => {
  try {
    const contact = validateContact(request.body);
    await sendPortfolioEmail(contact);
    response.status(200).json({ message: 'Message sent successfully.' });
  } catch (error) {
    next(error);
  }
};
