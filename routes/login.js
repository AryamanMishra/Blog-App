const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const session = require('express-session')
const flash = require('connect-flash')


/* Required models to be used */
const User = require('../models/user');



router.use(session({secret:'asecret', resave:false, saveUninitialized:'destroy'}))
router.use(flash())


/* Login form GET request */
router.get('/users/existing', (req,res) => {
    res.render('users/existing')
})




/* Functionality for POST request recieved from existing.ejs for login */

router.post('/users/existing', async(req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        res.render('users/userDetailserror')
    }
    else {
        const validPassword = await bcrypt.compare(password,user.password)
        if (validPassword) {
            req.session.user_id = user._id
            req.flash('success_log_in', 'Logged In Successfully')
            res.redirect(`/users/${user._id}/home`) // User found
        }
        else {
            res.render('users/userDetailserror')
        }
    }
})


module.exports = router