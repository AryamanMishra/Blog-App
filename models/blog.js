const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    user_id: {
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true 
    },
    tags: {
        type:String,
        required:true
    },
    content: {
        type:String,
        required:true
    }
})


const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog