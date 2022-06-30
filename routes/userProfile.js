const { Router } = require('express');
const express = require('express');
const router = express.Router();


const requireLogin = require('../middleware/requireLogin')

/* Required models to be used */
const User = require('../models/user');




/* Showing user profile page */
router.get('/users/:id/profile', requireLogin, async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.render('users/userDetails', {user}) // To show user details
    }
    catch {
        res.render('users/userDetailserror')
    }
})


module.exports = router