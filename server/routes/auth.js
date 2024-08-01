const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
require('dotenv').config();
const user = require('../models/user')
var jwt = require('jsonwebtoken');


//CreateUser API using POST method:  Auth not required
router.post('/createuser', async (req, res) => {
    const userData = await user.create(req.body);
    const token = jwt.sign(userData.id, process.env.JWT_SECRET_KEY)
    // localStorage.setItem('token', token);
    // localStorage.setItem('token', token)
    res.status(200).json({
        message: "user created",
        userData,
        token
    });
})

//Login APi using POST method:  Auth not required
router.post('/login', async (req, res) => {
    const userData = await user.findOne({ email: req.body.email })
    if (userData.password === req.body.password) {
        const token = jwt.sign(userData.id, process.env.JWT_SECRET_KEY)
        res.status(200).json({
            message: "Login Successfull",
            name: userData.name,
            token
        })
    }
    else {
        res.status(404).send("Invalid Credentials")
    }
})

module.exports = router