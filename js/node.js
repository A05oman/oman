// Backend server (app.js)
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure Nodemailer with your email service details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '2020100094t@psu.palawan.edu.ph',
      pass: '2020-1000-94T',
    },
  });

  // Setup email data
  const mailOptions = {
    from: '2020100094t@psu.palawan.edu.ph',
    to: '2020100094t@psu.palawan.edu.ph',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
