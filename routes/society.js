const express = require('express');
const router = express.Router();

require('dotenv').config()
const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const transporter = require("../helpers/emailHelper");

// Models
const Society = require('../models/society');

// Auth middleware
const auth = require('../helpers/authHelperSociety');

/*                                                  ROUTES                                                  */


// @route   POST /api/society/signup 
// @desc    Register a new society
// @access  Public 
router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;

    // Check for empty fields
    if(!name || !email || !password)
    {
        return res.json({
            success: false,
            message: "Please enter all the fields"
        })
    }

    // If society already exists
    const s = await Society.findOne({email});
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
        email,
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
        const {email, password} = req.body;
        // Find an existing society
        const society = await Society.findByCredentials(email,password)
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

// @route   POST /api/society/forgot 
// @desc    Forgot Password (send token)
// @access  Only for registered but public
router.post("/forgot", async(req, res) => {
    const society = await Society.findOne({email: req.body.email});
  
    if(!society)
    {
      return res.json({
        success: false,
        message: "Society not registered"
      });
    }
  
    // Generate and hash password token using crypto (to be sent to the society)
    const resetToken = crypto.randomBytes(20).toString('hex');
  
    // Hash it to store in the database
    society.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
    // Set expire
    society.resetPasswordExpire = Date.now() + 10 *60 * 1000;
  
    // Saving reset token and expires in the database
    await society.save();
  
    // Send reset password email
    const resetUrl = `${req.protocol}://localhost:3000/society/reset/password/${resetToken}`;
  
    let HelperOptions ={
      from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
      to : society.email,
      subject : "Seminar Scheduler Password Reset",
      text : "Hello " + society.name + `, \n\nYou are receiving this email because you have requested your password reset. Please visit: \n${resetUrl} and make a PUT request to reset your password.\n\nThe link is valid only for 10 minutes.\n\nRegards, \nSeminar Scheduler MSIT`
    };
  
    transporter.sendMail(HelperOptions,(err,info)=>{
      if(err) throw err;

      console.log("The message was sent");
      res.json({
        success: true,
        message: "Email sent successfully"
      })
     });
  
  });
  
  
  
// @route   POST /api/society/validToken 
// @desc    Check whether token is valid or not
// @access  Only for registered (user cannot be auth if he forgot his password)
router.post("/validToken", async(req, res) => {
  
  const resetPasswordToken = crypto.createHash('sha256').update(req.body.token).digest('hex');

  const society = await Society.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!society)
  {
    return res.json({
      success: false,
      message: "Invalid Token"
    })
  }
    
  return res.json({ 
      success: true 
  });
})

  
  
// @route   PUT /api/society/resetPassword/:resetToken 
// @desc    Reset Password using token
// @access  Only for registered
router.put("/resetPassword/:resetToken", async(req, res) => {

  // Validate new password
  if(!req.body.password || req.body.password === "" || req.body.password.length < 6)
  {
    return res.json({
      success: false,
      message: "Please enter a valid password with 6 or more characters"
    })
  }

  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  const society = await Society.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!society)
  {
    return res.json({
      success: false,
      message: "Invalid Token"
    })
  }

  society.password = req.body.password;
  society.resetPasswordToken = undefined;
  society.resetPasswordExpire = undefined;

  // Save new password to database
  await society.save();

  return res.json({
    success: true,
    message: "Password updated!",
  })
})


// @route   GET /api/society/getSociety/:id 
// @desc    Get a society details
// @access  Private
router.get('/getSociety/:id', async(req, res) => {

  try {
    const society = await Society.findById(req.params.id);

    if(society)
    {
      return res.json({
        success: true,
        data: society
      })
    }
  
    else
    {
      return res.json({
        success: false,
        message: 'Society Not Found'
      })
    }  
  } catch (err) {
      return res.json({
        success: false,
        message: err
      })
  }
}) 

// @route   PUT /api/society/update/:id
// @desc    Update a society by id
// @access  Private (using middleware) 
router.put('/update/:id', async(req, res) => {
  
  // Checking for empty fields
  for (var keys in req.body) {
    if (req.body[keys] === undefined || req.body[keys] === "") 
    {
      var incomplete = keys;
      break;
    }
  }
  
  // Return error if there are some undefined values
  if (incomplete != undefined) {
    return res.json({
      success: false,
      message: "Please fill " + incomplete.toUpperCase()
    });
  }

  await Society.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, society) => {
    society.password = undefined;
    return res.json({
      success: true,
      data: society
    });

    });
});



module.exports = router;