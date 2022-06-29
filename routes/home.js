const { Router } = require('express');
const express = require('express');
const router = express.Router();



/* Getting the home page of website */
router.get('/', (req,res) => {
    res.render('home')
})


module.exports = router