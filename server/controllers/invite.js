const sgMail = require('@sendgrid/mail');

// Setting api key for SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendInvite = (req, res) => {
  const { user, email, matchID } = req.body;
  const msg = {
    to: email,
    from: process.env.TEAM_EMAIL_ADDRESS,
    subject: 'You have been invited to a Cluewords game',
    text: `Game invite from ${user} has arrived.`,
    html: `<div style="background-color: #F7E6E6; padding:10px 10px 10px 10px;">
        <div 
          style="font-size:6px; line-height:10px; padding:16px 16px 16px 16px;"
          valign="top"
          align="center"
        >
          <img
            class="max-width"
            border="0"
            style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:20% !important; width:20%; height:auto !important;"
            width="240"
            alt="cluewords logo"
            data-proportionally-constrained="true"
            data-responsive="true"
            src="https://res.cloudinary.com/du081ilw3/image/upload/v1620276073/Assets/cluewords_uief0a.png"
          >
        </div>
        <div style="font-family: inherit; text-align: inherit">Hi,</div>
        <div style="font-family: inherit; text-align: inherit"><br></div>
        <div 
          style="font-family: inherit; text-align: inherit">
          You have been invited to a CLUEWORDS game by <strong>${user}</strong>. Please click the button to join the game or use the link provided, if the button is does not redirect you to the game.
        </div>
        <div><br></div>
        <div 
          align="center" 
          bgcolor="#60cc6f" 
          class="inner-td" 
          style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"
        >
          <a href="http://localhost:3000/join/${matchID}" 
            style="background-color:#60cc6f; border:1px solid #6ac087; border-color:#6ac087; border-radius:6px; border-width:1px; color:#242222; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;" 
            target="_blank"
          >
            Join Game
          </a>
        </div>
        <p>You can join the game by clicking <a href="http://localhost:3000/join/${matchID}">here</a></p>
      </div>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      return res.status(200).json({ message: 'Email Sent' });
    })
    .catch((error) => {
      return res.status(500).json({ message: 'Email not sent' });
    });
};

module.exports = {
  sendInvite,
};
