const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Name cannot be blank']
    },
    age: {
        type:Number,
        min:0,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:[true, 'Password cannot be blank']
    },
    interests: {
        type:String,
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User