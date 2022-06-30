const { Router } = require('express');
const express = require('express');
const router = express.Router();


const requireLogin = require('../middleware/requireLogin')

/* Required models to be used */
const User = require('../models/user');
const Blog = require('../models/blog');



/* Functionality to create new blog */
router.get('/users/:id/home/new', requireLogin, (req,res) => {
    const {id} = req.params
    res.render('newBlog', {id}) // id passed to keep it hidden on newBlog page to be used for searching
})


/* POST request to create new Blog recived from newBlog.ejs */
router.post('/users/:id/home/new', (req,res) => {
    const newBlog = new Blog(req.body)
    console.log(req.body)
    newBlog.save().then(() => { // Saving blogs in database
        console.log('saved')
        res.redirect(`/users/${req.body.user_id}/home/My-Blogs`)
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router