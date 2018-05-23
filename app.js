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
    console.log(req.body)
})