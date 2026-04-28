import {buildTransporter} from './_smtp';
import {getClientIp, isRateLimited} from './_rateLimit';

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
};

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  const ip = getClientIp(req);
  if (isRateLimited(`contact:${ip}`)) {
    return res.status(429).json({error: 'Trop de tentatives. Merci de reessayer plus tard.'});
  }

  const {name, email, subject, message, company} = (req.body ?? {}) as ContactPayload;
  if (company) {
    return res.status(200).json({ok: true});
  }

  const sanitizedName = String(name ?? '').trim();
  const sanitizedEmail = String(email ?? '').trim();
  const sanitizedSubject = String(subject ?? '').trim();
  const sanitizedMessage = String(message ?? '').trim();

  if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
    return res.status(400).json({error: 'Tous les champs sont obligatoires.'});
  }

  if (!isEmail(sanitizedEmail)) {
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
      replyTo: sanitizedEmail,
      subject: `[Contact Site] ${sanitizedSubject}`,
      text: [
        `Nom: ${sanitizedName}`,
        `Email: ${sanitizedEmail}`,
        `Sujet: ${sanitizedSubject}`,
        '',
        'Message:',
        sanitizedMessage,
      ].join('\n'),
      html: `
        <h2>Nouveau message du site</h2>
        <p><strong>Nom:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Sujet:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return res.status(200).json({ok: true});
  } catch (error) {
    console.error('SMTP send failed', {route: 'contact', ip, error});
    return res.status(500).json({error: "Le message n'a pas pu etre envoye."});
  }
}
