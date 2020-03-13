const express = require('express');
const router = express.Router();

require('dotenv').config()

// Models
const Society = require('../models/society');


/*                                                  ROUTES                                                  */


// @route   POST /api/society/signup 
// @desc    Register a new society
// @access  Public 
router.post('/signup', async (req, res) => {
    const {name, password} = req.body;

    // Check for empty fields
    if(!name || !password)
    {
        return res.json({
            success: false,
            message: "Please enter all the fields"
        })
    }

    // If society already exists
    const s = await Society.findOne({name});
    if(s)
    {
        return res.json({
            success: false,
            message: "Society already registered"
        })
    }

    // Register a new society
    society = new Society({
        name,
        password
      });

      await society.save();

    //   Generate the Auth Token
    try{
        const token=await society.generateAuthToken()

        res.status(201).json({
            success: true,
            token
        })
    } catch (e){
        res.status(400).json({
            success: false,
            error: e
        })
    }

});

// @route   POST /api/society/signin 
// @desc    Signin a society
// @access  Public 
router.post('/signin', async (req,res) => {
    try{
        const {name, password} = req.body;
        // Find an existing society
        const society = await Society.findByCredentials(name,password)
        // Generate an auth token
        const token=await society.generateAuthToken()
        res.status(200).json({
            success: true,
            society,
            token
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            error: e
        })
    }
})

module.exports = router;