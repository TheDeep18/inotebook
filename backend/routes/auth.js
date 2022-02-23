const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('name', 'Name must be atleast of 3 letters').isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password length must be of more than 5 letters').isLength({ min: 5 }),
] ,(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error: "Please enter a unique value for email", message:err.message})})
        
        
})
module.exports = router