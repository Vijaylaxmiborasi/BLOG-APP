require('./model/config')
const route = require('./route/commonRoute')
const dotenv = require('dotenv')
dotenv.config()

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))

const server = app.listen(process.env.PORT, function (req, res){
    console.log(`Server is running on port no : ${process.env.PORT}`);
})

app.use('/', route)

module.exports = server
