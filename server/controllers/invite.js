const sgMail = require('@sendgrid/mail');

// Setting api key for SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvite = (req, res) => {
  const msg = {
    to: 'test@example.com', // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendInvite,
};
