const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()

// Models
const Society = require('../models/society');


/*                                                  ROUTES                                                  */


// @route   POST /api/society/auth 
// @desc    Register a new society
// @access  Public 
router.post('/', async (req, res) => {
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

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      society.password = await bcrypt.hash(password, salt);

      await society.save();

      // Payload for JWT
      const payload = {
        society: {
          id: society.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err)
          {
            throw err;
          } 
          return res.json({
              success: true,
              token
          });
        });

});

module.exports = router;