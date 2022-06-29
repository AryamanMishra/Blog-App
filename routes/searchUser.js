const { Router } = require('express');
const express = require('express');
const router = express.Router();


/* Required models to be used */
const User = require('../models/user');
const Blog = require('../models/blog');



function textModify(text) {
    let ans = ''
    let c = text.slice(0,1)
    c = c.toUpperCase()
    ans += c + text.slice(1)
    if (text.indexOf('') !== -1) {
        let ind = text.indexOf(' ') + 1
        let chr = text.substring(ind,ind+1)
        chr = chr.toUpperCase()
        let str = ans.slice(ind+1)
        chr += str;
        ans = ans.substring(0,ind) + chr
    }
    return ans 
}





/* POST request to search a user by user name by the search input provided on home page */
router.post('/users/searchUser', async(req,res) => {
    const validUsers = []
    const name_and_id = []
    let searchName = req.body.name
    let temp = searchName
    searchName = textModify(searchName)
    const users = await User.find({name:searchName})
    if (JSON.stringify(users) !== '[]') { // Checking if user name exists in database
        for (let i=0;i<users.length;i++) {
            validUsers.push(users[i])
        }
        name_and_id.push(temp)
        name_and_id.push(req.body.id)
        res.render('showUsers',{validUsers, name_and_id,searchName})
    }
    else {
        res.render('users/userDetailserror') // No user found
    }
})

module.exports = router