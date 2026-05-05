const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

console.log('Compte:', process.env.GMAIL_USER);

transporter.verify((error, success) => {
  if (error) {
    console.error('Connexion echouee:', error.message);
    process.exit(1);
  } else {
    console.log('Gmail OK! Envoi en cours...');
    transporter.sendMail({
      from: `"HealthAegis" <${process.env.GMAIL_USER}>`,
      to: 'kheireddine.debz@univ-annaba.dz',
      subject: 'Test HealthAegis - Verification email',
      html: '<h2>Test reussi!</h2><p>La configuration Gmail fonctionne correctement.</p>',
    }, (err, info) => {
      if (err) { console.error('Envoi echoue:', err.message); process.exit(1); }
      else { console.log('Email envoye! MessageId:', info.messageId); process.exit(0); }
    });
  }
});
