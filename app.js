const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('BS server'))
 
app.listen(3000, () => console.log('Server listening on port 3000!'))

app.post('/', (req, res) => {
    const output = `
    <p> You have a new Check scheduled </p>
    <h3> Check details </h3>
    <h4> Contact person details </h4>
    <ul>
        <li> Name : ${req.body.contactPersonName} </li>
        <li> Email : ${req.body.contactEmail} </li>
    </ul>
    `

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Boris.Josz@gmail.com',
            pass: '0be1207ac1513759133000000'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

        // SMTP settings
        // host: 'mail.traversymedia.com',
        // port: 587,
        // secure: false,
        // auth: {
        //     user:
        //     pass:
        // }

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Boris Josz 👻" <Boris.Josz@gmail.com>', 
        to: 'Boris.Josz@medicheck.io',
        subject: 'TESTING ✔',
        text: 'Did this work?',
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

})