const { Router } = require('express');
const express = require('express');
const router = express.Router();


/* Required models to be used */
const User = require('../models/user');
const Blog = require('../models/blog');


/* User home page */
router.get('/users/:id/home', async(req,res) => {
    try {
        if (req.session.user_id) {
            const { id } = req.params
            const user = await User.findById(id)
            res.render('users/userHome', {user}) // Home page
        }
        else {
            res.redirect('/users/existing')
        }
    }
    catch {
        res.render('users/userDetailserror')
    }
}) 


module.exports = router