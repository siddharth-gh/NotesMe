const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
require('dotenv').config();
const user = require('../models/user')
var jwt = require('jsonwebtoken');



//CreateUser API using POST method:  Auth not required
router.post('/createuser', async (req, res) => {

    try {
        const userData = await user.create(req.body);
        const token = jwt.sign(userData.id, process.env.JWT_SECRET_KEY) //TODO - Add expiry

        res.status(200).json({
            alert: "SignedUp successfully",
            userData,
            token
        });
    }
    catch (error) {
        if (error.code === 11000) { // Duplicate key error code
            return res.status(400).json({
                alert: "Email already exists",
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
})

//Login APi using POST method:  Auth not required
router.post('/login', async (req, res) => {
    try {
        const userData = await user.findOne({ email: req.body.email })

        if (!userData) {
            res.status(400).json({
                alert: "Email id doesn't exist"
            })
            return;
        }

        if (userData.password === req.body.password) {
            const token = jwt.sign(userData.id, process.env.JWT_SECRET_KEY) //TODO - Add expiry
            res.status(200).json({
                alert: "Login Successful",
                name: userData.name,
                token
            })
            console.log("A user logged in...")
        }
        else {
            res.status(404).json({
                alert: "Invalid password"
            })
        }
    }
    catch (error) {
        res.status(400).json({ alert: error.mmessage })
    }
})

module.exports = router