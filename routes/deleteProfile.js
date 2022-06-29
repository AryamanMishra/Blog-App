const { Router } = require('express');
const express = require('express');
const router = express.Router();

/* Required models to be used */
const User = require('../models/user');



/* DELETE request to delete a user profile */
router.delete('/delete', async(req,res) => {
    const id = req.body._id
    const user = await User.findByIdAndDelete(id)
    res.redirect('/')
})


module.exports = router