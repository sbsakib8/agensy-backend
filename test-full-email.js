require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Environment Variables Check:');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
console.log('');

if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.log('❌ SMTP credentials are missing!');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mailOptions = {
  from: `"${process.env.SMTP_FROM_NAME || 'Test App'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
  to: process.env.SMTP_USER,
  subject: 'Password Reset Test',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #4CAF50;">Password Reset Test</h1>
      <p>This is a test email from your password reset system.</p>
      <p>If you're receiving this, your email configuration is working!</p>
      <div style="margin: 30px 0;">
        <a href="http://localhost:3000/reset-password?token=TEST123&email=${process.env.SMTP_USER}"
           style="background: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Test Reset Link
        </a>
      </div>
      <p style="color: #666; font-size: 12px;">This is a test email. This link won't actually reset any password.</p>
    </div>
  `,
};

console.log('Sending test email to:', process.env.SMTP_USER);
console.log('');

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('❌ Email Failed:', error);
  } else {
    console.log('✅ Email Sent Successfully!');
    console.log('Message ID:', info.messageId);
    console.log('');
    console.log('📬 Check your inbox:', process.env.SMTP_USER);
    console.log('⚠️  Also check your SPAM folder!');
  }
  process.exit(error ? 1 : 0);
});
