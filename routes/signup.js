const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


/* Required alert module */
const alert = require('alert');

/* Required models to be used */
const User = require('../models/user');




/* Sign Up form GET request */
router.get('/users/new', (req,res) => {
    res.render('users/newUser')
})



/* Functionality for POST request recieved from newUser.ejs for signup */
router.post('/users/new', async(req,res) => {
    try {
        const {name,age,interests,email,password} = req.body
        const check = await User.find({email:email})
   

        /* Already exisiting account found */
        /* check is an array */
        if (JSON.stringify(check) !== '[]') {
            res.render('users/emailexists')
        }

        /* Creating new account and saving to DB */
        else {
            const hash = await bcrypt.hash(password, 12) 
            const user = new User({
                name,
                age,
                email,
                password:hash,
                interests
            })
            await user.save()
            req.session.user_id = user._id
            res.redirect(`/users/${user._id}/home`) // Redirecting to new account
        }
    }
    catch(error) {
        console.log('Sign Up error!!!!')
        console.log(error)
        res.redirect('/users/userDetailserror') // Error page
    }
})



module.exports = router