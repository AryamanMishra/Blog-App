const { Router } = require('express');
const express = require('express');
const router = express.Router();



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
        const newUser = new User(req.body)
        const check = await User.find({name:newUser.name, age:newUser.age, email:newUser.email, password:newUser.password})
        // console.log(newUser)
        // console.log('b/w')
        // console.log(check)

        /* Already exisiting account found */
        /* check is an array */
        if (JSON.stringify(check) !== '[]') {
            alert(`Account already exists \nLogged in as ${check[0].name}`);
            console.log('same user')
            res.redirect(`/users/${check[0]._id}/home`) // Redirecting to already existing accout
        }

        /* Creating new account and saving to DB */
        else {
            const emailcheck = await User.find({email:newUser.email})
            newUser.save().then(() => {
                console.log('new user logged in')
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
            if (JSON.stringify(emailcheck) !== '[]') {
                res.render('users/emailexists')
            }
            else {
                res.redirect(`/users/${newUser._id}/home`) // Redirecting to new account
                alert('New Account created succesfully')
            }
        }
    }
    catch(error) {
        console.log('Sign Up error!!!!')
        console.log(error)
        res.redirect('/users/userDetailserror') // Error page
    }
})



module.exports = router