# Developer Portfolio

A React and Vite portfolio presenting the developer's profile, resume, skills, experience, projects, and certificates.

The contact form sends messages through Resend using the minimal Express API in `../server`.

## Run locally

```bash
npm install
npm run dev
```

In a second terminal, start the contact API:

```bash
cd ../server
npm install
npm run dev
```

Update portfolio content in `src/data/fallbackData.js` and replace the resume PDF in `public/resume/` when needed.

## Contact email configuration

Copy `server/.env.example` to `server/.env` and configure:

```text
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
RESEND_TO_EMAIL=singhmani5995@gmail.com
```

For production delivery, verify your sending domain in Resend and use an address on that domain for `RESEND_FROM_EMAIL`. If the API is deployed on a different origin, set `VITE_API_URL` in the client deployment to its public URL.
