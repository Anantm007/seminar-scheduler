const express = require('express');
const router = express.Router();

require('dotenv').config()

// Models
const Admin = require('../models/admin');


/*                                                  ROUTES                                                  */


// @route   POST /api/admin/signup 
// @desc    Register a new admin
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

    // If admin already exists
    const a = await Admin.findOne({name});
    if(a)
    {
        return res.json({
            success: false,
            message: "Admin already registered"
        })
    }

    // Register a new admin
    admin = new Admin({
        name,
        password
      });

      await admin.save();

    //   Generate the Auth Token
    try{
        const token=await admin.generateAuthToken()

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

// @route   POST /api/admin/signin 
// @desc    Signin an admin
// @access  Public 
router.post('/signin', async (req,res) => {
    try{
        const {name, password} = req.body;
        // Find an existing admin
        const admin = await Admin.findByCredentials(name,password)
        // Generate an auth token
        const token=await admin.generateAuthToken()
        res.status(200).json({
            success: true,
            admin,
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