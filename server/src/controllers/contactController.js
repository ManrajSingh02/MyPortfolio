import { sendPortfolioEmail } from "../services/resendService.js";
import { validateContact } from "../utils/validateContact.js";

export const sendContactMessage = async (req, res, next) => {
  try {
    const contact = validateContact(req.body);

    await sendPortfolioEmail(contact);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    next(error);
  }
};