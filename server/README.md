# Portfolio Contact API

Minimal Express backend for the portfolio contact form. It validates and rate-limits messages, then sends them through Resend. No database is required.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your Resend API key and verified sender address.
3. Run `npm install` and `npm run dev`.

The API runs on `http://localhost:5000`. Available endpoints:

- `GET /api/health`
- `POST /api/contact`
