import {buildTransporter} from './_smtp';
import {getClientIp, isRateLimited} from './_rateLimit';

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  const ip = getClientIp(req);
  if (isRateLimited(`newsletter:${ip}`)) {
    return res.status(429).json({error: 'Trop de tentatives. Merci de reessayer plus tard.'});
  }

  const email = String(req.body?.email ?? '').trim();
  const company = String(req.body?.company ?? '').trim();

  if (company) {
    return res.status(200).json({ok: true});
  }

  if (!isEmail(email)) {
    return res.status(400).json({error: 'Adresse email invalide.'});
  }

  const smtp = buildTransporter();
  if (!smtp) {
    return res.status(500).json({error: 'Configuration SMTP manquante.'});
  }

  try {
    await smtp.transporter.sendMail({
      from: smtp.config.fromEmail,
      to: smtp.config.toEmail,
      replyTo: email,
      subject: '[Newsletter] Nouvelle demande d inscription',
      text: `Nouvelle inscription newsletter:\n\nEmail: ${email}`,
      html: `<p><strong>Nouvelle inscription newsletter:</strong> ${email}</p>`,
    });
    return res.status(200).json({ok: true});
  } catch (error) {
    console.error('SMTP send failed', {route: 'newsletter', ip, error});
    return res.status(500).json({error: "L'inscription n'a pas pu etre enregistree."});
  }
}
