const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    age: {
        type:Number,
        min:0
    },
    email: {
        type:String,
        required:true
    },
    interests: {
        type:String
    }
})

const User = mongoose.model('User',userSchema)

module.exports = User