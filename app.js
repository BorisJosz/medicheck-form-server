const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer({dest: 'uploads/' });

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));


// BASIC RESPONSES
app.listen(3000, () => console.log('Server listening on port 3000!'))
app.get('/', (req, res) => res.send('Hello you'))

// DATA UPLOAD
// app.post('/', upload.any(), function (req, res, next) {
//     const payload = JSON.parse(req.body.payload)

//     // console.log(req.files)
//     // // req.files has the images uploaded form medicalCertificate
//     // console.log(req.body)
//     console.log(req.body.payload)
//     console.log(payload)
//     // console.log(req.body.payload.contactPersonName)
//     // console.log(req.body.payload[0].contactPersonName)
//     // req.body has the text fields + toggle + datepicker data
// })

// SENDING MAIL
app.post('/', upload.any(), (req, res, next) => {
    const payload = JSON.parse(req.body.payload)
    const output = `
    <p> You have a new Check scheduled </p>
    <h3> Check details </h3>
    <h4> Contact person details </h4>
    <ul>
        <li> First Name : ${payload.contactPersonFirstName} </li>
        <li> Last Name : ${payload.contactPersonLastName} </li>
        <li> Email : ${payload.contactEmail} </li>
        <li> Phone Number : ${payload.contactPhoneNumber} </li>
    </ul>
    <h4> Employee to be checked </h4>
    <ul>
        <li> First Name : ${payload.employeeFirstName} </li>
        <li> Last Name : ${payload.employeeLastName} </li>
        <li> Phone Number : ${payload.employeePhoneNumber} </li>
        <li> Street Address : ${payload.employeeAddress} </li>
        <li> Employee Position : ${payload.employeePosition} </li>
        <li> Employee speaks ${payload.employeeLanguage} </li>
    </ul>
    <h4> Check details </h4>
    <ul>
        <li> Optimized : ${payload.optimizedCheck} </li>
        <li> At Home : ${payload.atHome} </li>
    </ul>
    <h4> Incapacity Period </h4>
    <p> Incapacity starts from ${payload.startDate} and ends ${payload.endDate} </p>
    <h4> Additional comments </h4>
    <p> For the Doctor : </p>
    <p> ${payload.commentDoctor} </p>
    <p> For Medicheck : </p>
    <p> ${payload.commentMedicheck} </p>
    `

    // mail settings
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
        attachments: req.files,
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