const express = require('express');
const router = express.Router();
const auth = require('../helpers/authHelperSociety')

require('dotenv').config()

const Booking = require('../models/booking');

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
            societyEmail: req.society.societyEmail,
            societyId: req.society._id,
            eventDate: data.eventDate,
            startTime: data.startTime,
            endTime: data.endTime,
            seminarHall: data.seminarHall
        })
        await booking.save()
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
        const data = req.body
        var check = await Booking.checkAvailability(data.eventDate, data.startTime, data.endTime)
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