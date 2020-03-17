const express = require('express');
const router = express.Router();

require('dotenv').config()

const Booking = require('../models/booking');

// @route   POST /api/booking/add 
// @desc    Add a booking
// @access  Public 
router.post('/add', async(req,res)=>{
    try{
        const data = req.body
        var booking = new Booking(data)
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