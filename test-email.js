const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'riyadkhan9370@gmail.com',
    pass: 'qoxucvgnmyrsdovg'
  }
});

const mailOptions = {
  from: '"Test App" <riyadkhan9370@gmail.com>',
  to: 'riyadkhan9370@gmail.com',
  subject: 'Test Email - Password Reset System',
  html: `
    <h1>Test Email</h1>
    <p>If you receive this, your email configuration is working correctly!</p>
    <p>Your password reset system is ready to use.</p>
  `
};

console.log('Sending test email...');

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log('❌ Email Send Failed:', error.message);
  } else {
    console.log('✅ Email Sent Successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    console.log('\nCheck your inbox: riyadkhan9370@gmail.com');
  }
  process.exit(0);
});
