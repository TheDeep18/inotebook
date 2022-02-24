const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

//create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Name must be atleast of 3 letters').isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password length must be of more than 5 letters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether a user with this email already exists
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }
        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        })
        res.json(user)
    } catch (error) {
        console.error(error.body)
        res.status(500).send("Some Error occured")
    }



})
module.exports = router