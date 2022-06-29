const { Router } = require('express');
const express = require('express');
const router = express.Router();



/* Required models to be used */
const User = require('../models/user');



/* Login form GET request */
router.get('/users/existing', (req,res) => {
    res.render('users/existing')
})




/* Functionality for POST request recieved from existing.ejs for login */

router.post('/users/existing', (req,res) => {
    let userTocheck = req.body

    /* Finding appropriate existing user */
    const findUser = User.findOne({name:userTocheck.name, age:userTocheck.age, email:userTocheck.email, password:userTocheck.password})
        .then((data) => {
            res.redirect(`/users/${data._id}/home`) // User found
            console.log('success')
            console.log(data)
        })

        /* No user found */
        .catch (err => {
            res.render('users/userDetailserror.ejs') // Redirecting to login page
        })
})


module.exports = router