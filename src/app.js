require('dotenv').config();
const express = require('express');

const app = express();
const Authcontroller = require("./Controllers/AuthController")


app.use(express.json());

app.use('/auth', Authcontroller)


app.listen(3001, () => {
    console.log('Server Online')
})