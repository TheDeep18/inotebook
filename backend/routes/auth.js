const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Deep@deep@18'

//ROUTE 1: create a user using: POST "/api/auth/createuser". No login required
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

        //using bcrypt js for hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        //Using jwt for token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // res.json(user)
        res.json({ authToken })


    } catch (error) {
        console.error(error.body)
        res.status(500).send("Some Error occured")
    }

})





//ROUTE 2: create a login using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', 'Password area should not be empty').exists(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please login with correct credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        // res.json(user)
        res.json({ authToken })


    } catch (error) {
        console.error(error.body)
        res.status(500).send("Some Error occured")
    }
})

//ROUTE 2: create a login using: POST "/api/auth/login". No login required
router.post('/getuser', fetchuser,  async (req, res) => {
try {
    userId = req.user.id
    let user = await User.findById(userId).select("-password")
    res.send(user)


} catch (error) {
    console.error(error.body)
    res.status(500).send("Some Error occured")
}
}

)

module.exports = router