const {Router} = require('express')
const express = require("express");
const router = express.Router();




/* post method to logout a user with proper destroying of session contents */
router.post('/logout', (req,res) => {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router