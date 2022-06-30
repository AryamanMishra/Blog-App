const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


/* Required models to be used */
const User = require('../models/user');



/* GET request to edit user profile */
router.get('/users/:id/profile/edit', async(req, res) => {
    if (req.session.user_id) {
        try {
            const {id} = req.params
            const user = await User.findById(id)
            res.render('users/editDetails', {user})
            //console.log('Profile updated')
        }
        catch{
            console.log('error in edit')
        }
    }
    else {
        res.redirect('/users/existing')
    }
})


/* POST request to edit user details */
router.put('/users/:id/profile/edit', async(req,res) => {
    try {
        const id = req.body._id
        //console.log(id)
        const user = await User.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        console.log(req.body)
        res.redirect(`/users/${id}/profile`)
    }
    catch(err){
        console.log('error in edit put')
        console.log(err)
    }
})


module.exports = router