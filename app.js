const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('BS server'))
 
app.listen(3000, () => console.log('Server listening on port 3000!'))

app.post('/', function (req, res) {
    const check = req.body
    console.log(
        {
        contactPersonName: check.contactPersonName,
        contactEmail: check.contactEmail,
        employeeFirstName: check.employeeFirstName,
        employeeLastName: check.employeeLastName,
        employeePhoneNumber: check.employeePhoneNumber,
        employeeAddress: check.employeeAddress,
        commentDoctor: check.commentDoctor,
        commentMedicheck: check.commentMedicheck
        }
    )
    res.send('Got a POST request')
})