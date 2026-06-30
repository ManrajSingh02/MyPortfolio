import cors from 'cors';
import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/contact', contactRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
