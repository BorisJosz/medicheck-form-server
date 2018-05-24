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
    <h4> Employee to be checked </h4>
    <ul>
        <li> Name : ${req.body.employeeFirstName} "" ${req.body.employeeLastName} </li>
        <li> Phone Number : ${req.body.employeePhoneNumber} </li>
        <li> Street Address : ${req.body.employeeAddress} </li>
        <li> Employee speaks ${req.body.employeeLanguage} </li>
    </ul>
    <h4> Check details </h4>
    <ul>
        <li> Optimized : ${req.body.optimizedCheck} </li>
        <li> At Home : ${req.body.atHome} </li>
    </ul>
    <h4> Incapacity Period </h4>
    <p> Incapacity starts from ${req.body.startDate} and ends ${req.body.endDate} </p>
    <h4> Additional comments </h4>
    <p> For the Doctor : </p>
    <p> ${req.body.commentDoctor} </p>
    <p> For Medicheck : </p>
    <p> ${req.body.commentMedicheck} </p>
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
        to: 'Boris@medicheck.io',
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