const { Router } = require('express');
const express = require('express');
const router = express.Router();


/* Required models to be used */
const User = require('../models/user');
const Blog = require('../models/blog');



/* Functionality to see blogs created by user */
router.get('/users/:id/home/My-Blogs', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        const blogs = await Blog.find({user_id:id})
        //console.log(blogs)
        res.render('users/myBlogs',{user,blogs}) // Rendering myBlogs page
    }
    catch {
        console.log('error in myblogs')
    }
})


module.exports = router