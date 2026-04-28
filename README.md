<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/4b3c7649-6830-496c-a5ce-1ef398a80066

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Contact and newsletter setup

The contact form (`/api/contact`) and newsletter form (`/api/newsletter`) send emails via SMTP.

Set these environment variables locally and in Vercel:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE` (`true` for SSL, usually port 465; `false` for STARTTLS, usually 587)
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (optional)
- `VITE_HELLOASSO_URL` (public URL for donation CTAs)

You can copy values from `.env.example` for local testing.
