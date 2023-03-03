const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // profilepic : {
    //     type : String,
    //     required : true
    // },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
})

userSchema.set('timestamps', true)
module.exports = mongoose.model('user', userSchema)
