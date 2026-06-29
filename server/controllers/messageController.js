import Message from '../models/Message.js';
import asyncHandler from '../utils/asyncHandler.js';
import { sendContactEmail } from '../services/mailService.js';

export const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Name, email and message are required');
  }
  const saved = await Message.create({ name, email, subject, message });
  await sendContactEmail(saved).catch(() => {});
  res.status(201).json({ message: 'Message sent successfully' });
});

export const getMessages = asyncHandler(async (_req, res) => {
  const items = await Message.find().sort({ createdAt: -1 });
  res.json({ items, total: items.length });
});

export const deleteMessage = asyncHandler(async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: 'Message deleted successfully' });
});
