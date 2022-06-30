const { Router } = require('express');
const express = require('express');
const router = express.Router();


const requireLogin = require('../middleware/requireLogin')

/* Required models to be used */
const User = require('../models/user');
const Blog = require('../models/blog');


/* User home page */
router.get('/users/:id/home', requireLogin, async(req,res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.render('users/userHome', {user}) // Home page
    }
    catch {
        res.render('users/userDetailserror')
    }
}) 


module.exports = router