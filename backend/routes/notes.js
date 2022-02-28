const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//ROUTE 1: Get all the notes using: GET "/api/auth/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id})
        res.json(notes)
        
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some Error occured")
    }


})


//ROUTE 2: Add a new note using: POST "/api/auth/addnote". Login required
router.post ('/addnote', fetchuser,[
    body('title', 'Title must be atleast of 3 letters').isLength({ min: 3 }),
    body('description', 'Description length must be atleat of 5 letters').isLength({ min: 5 }),
], async (req, res) => {

    try {

        const {title, description, tag} = req.body;

        //If there are errors, return Bad request and the erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user:req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
        
    } catch (error) {
        console.error(error.body)
        res.status(500).send("Some Error occured")
    }   


})

module.exports = router