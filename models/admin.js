const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AdminSchema = new mongoose.Schema({

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

    seminarHallsIncharge: [],

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire: {
        type: String
    },
    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
    
}, {timestamps: true}

);

AdminSchema.methods.generateAuthToken = async function (){
    const admin = this
    console.log('Helo',admin)
    const token = jwt.sign({admin: {id: admin.id}}, process.env.JWTSECRET)
    console.log(token)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

AdminSchema.statics.findByCredentials = async (name, password) => {
    const admin = await Admin.findOne({name: name})
    if(!admin){
        throw new Error('Unable to Log In')
    }
    const isMatch=await bcrypt.compare(password,admin.password)
    if(!isMatch){
        throw new Error('Unable to Log In')
    }
    return admin
}

AdminSchema.pre('save',async function(next){
    const admin=this
    if(admin.isModified('password')){
        admin.password=await bcrypt.hash(admin.password,8)
    }
    next()
})

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;