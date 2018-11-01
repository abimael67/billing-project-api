
let express = require('express')
let bodyParser = require('body-parser')

let app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const articleRoute = require('./routes/articleRoutes');
const customerRoute = require('./routes/customerRoutes');
const sellerRoute = require('./routes/sellerRoute');
const billRoute = require('./routes/billRoute');

app.use('/articles', articleRoute)
app.use('/customers', customerRoute)
app.use('/sellers', sellerRoute)
app.use('/bills', billRoute)
app.get('/', ((req,res)=> res.status(200).send('Welcome to Billing API')))
module.exports = app