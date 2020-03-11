const mongoose = require('mongoose');

const SocietySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6
    },

    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    }],

    pending: [{
        type: mongoose.Schema.Tupes.ObjectId,
        ref: 'Booking'
    }],

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire: {
        type: String
    }
    
}, {timestamps: true}

);

module.exports = mongoose.model('Society', SocietySchema);