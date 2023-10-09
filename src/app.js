require('dotenv').config();
const express = require('express');

const app = express();
const Authcontroller = require("./Controllers/AuthController")
const ScheduleController = require("./Controllers/ScheduleController")


app.use(express.json());

app.use('/auth', Authcontroller)
app.use('/schedule', ScheduleController)


app.listen(3001, () => {
    console.log('Server Online')
})