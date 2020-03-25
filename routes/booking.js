const express = require('express');
const router = express.Router();
const auth = require('../helpers/authHelperSociety')

require('dotenv').config()

const Booking = require('../models/booking');
const Admin = require('../models/admin');

// @route   POST /api/booking/add 
// @desc    Add a booking
// @access  Private(Only a registered society can apply for event) 
router.post('/add', auth, async(req,res)=>{
    try{
        const data = req.body
        var booking = new Booking({
            name: data.name,
            description: data.description,
            societyName: req.society.name,
            societyEmail: req.society.email,
            societyId: req.society._id,
            eventDate: data.eventDate,
            startTime: data.startTime,
            endTime: data.endTime,
            seminarHall: data.seminarHall
        })
        await booking.save()

        /*const admins = await Admin.find({seminarHallsIncharge: { "$in": [data.seminarHall]} }).select('name email');
        console.log('lol', admins)
        for(var i = 0; i < admins.length; i++)
        {
            let HelperOptions ={
                from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
                to : admins[i].email,
                subject : `${booking.societyName} has requested permission for seminar hall  ${booking.seminarHall}`,
                text : "Hello " + admins[i].name + `, \n\n${booking.societyName} has requested permission for seminar hall ${booking.seminarHall} for ${booking.name}. Please log in to review the application.\n\nRegards, \nSeminar Scheduler MSIT`
              };
            
              transporter.sendMail(HelperOptions,(err,info)=>{
                if(err) throw err;
          
                console.log("The message was sent");
              })
        }*/
        res.status(200).json({
            success: true,
            booking
        })
    } catch (e){
        res.status(400).json({
            success: false,
            error: e
        })
    }
})

// @route   POST /api/booking/check 
// @desc    Check availability of Slot
// @access  Public 
router.post('/check', async (req,res)=>{
    try{
        console.log(req.body)        
        const {seminarHall, eventDate, startTime, endTime} = req.body;
        if(!seminarHall || !eventDate || !startTime || !endTime)
        {
            return res.json({
                success: false,
                nessage: "Please fill all the fields"
            })
        }
        
        let x = Number(seminarHall)
        
        const eDate = {
            date: eventDate.substring(8,9),
            month: eventDate.substring(5,6),
            year: eventDate.substring(0,3)
        }

        var check = await Booking.checkAvailability(x, eDate, startTime, endTime)
        if(check){
            res.status(200).json({
                success: true,
                availability: true
            })
        }
        else{
            res.status(200).json({
                success: true,
                availability: false
            })
        }
    } catch (e){
        res.status(400).json({
            success: false,
            error: e
        })
    }
})

module.exports = router;