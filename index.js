/*
    BlogAddict
    Running on express and mongodb

*/


/* Required module for express */
const express = require('express')
const app = express()

/* Required module for path */
const path = require('path')

/* Required module for method overriding used to include requests other than POST and GET in ejs*/   
const methodOverride = require('method-override')

/* Required models to be used */
const User = require('./models/user');
const Blog = require('./models/blog');


/* Required mongoose module */
const mongoose = require('mongoose');

/* Required alert module */
const alert = require('alert');


/* Connecting mongoose to mongodb */
mongoose.connect('mongodb://localhost:27017/BlogApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})


/* Use method of express to access static files like html and css */
app.use(express.static(__dirname + '/public'));

/* Set method of express to join the path to cwd */
app.set('views',path.join(__dirname,'views'))

/* Setting view engine to ejs used for dynamic templating */
app.set('view engine','ejs')

/* Use method of express to convert the req object to readable form */
app.use(express.urlencoded({extended:true}))

/* Use method of express to invoke methodOverride with key name '_method' */
app.use(methodOverride('_method'))


/*
    Main functionality code from here
*/


/* Getting the home page of website */
app.get('/', (req,res) => {
    res.render('home')
})


/* Login form GET request */
app.get('/users/existing', (req,res) => {
    res.render('users/existing')
})


/* Functionality for POST request recieved from existing.ejs for login */
app.post('/existing', (req,res) => {
    let userTocheck = req.body

    /* Finding appropriate existing user */
    const findUser = User.findOne({name:userTocheck.name,age:parseInt(userTocheck.age),email:userTocheck.email})
        .then((data) => {
            //alert(`Signed in successfully`)
            res.redirect(`/users/${data._id}/home`) // User found
            console.log('success')
            console.log(data)
        })

        /* No user found */
        .catch (err => {
            alert('User by these credentials does not exist, please sign up')
            res.redirect('/') // Redirecting to login page
            //console.log(err)
            //console.log('fail')
        })
})


/* Sign Up form GET request */
app.get('/users/new', (req,res) => {
    res.render('users/newUser')
})


/* Functionality for POST request recieved from newUser.ejs for signup */
app.post('/user', async(req,res) => {
    try {
        const newUser = new User(req.body)
        const check = await User.find({name:newUser.name, age:newUser.age, email:newUser.email, password:newUser.password})
        // console.log(newUser)
        // console.log('b/w')
        // console.log(check)

        /* Already exisiting account found */
        /* Check is an array */
        if (JSON.stringify(check) !== '[]') {
            alert(`Account exists \nLogged in as ${check[0].name}`)
            console.log('same user')
            res.redirect(`/users/${check[0]._id}/home`) // Redirecting to already existing accout
        }

        /* Creating new account and saving to DB */
        else {
            newUser.save().then(() => {
                alert(`New Account created for ${newUser.name}`)
                console.log('new user logged in')
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
            res.redirect(`/users/${newUser._id}/home`) // Redirecting to new account
        }
    }
    catch {
        console.log('Sign Up error!!!!')
        res.redirect('/users/userDetailserror') // Error page
    }
})


/* Showing user details page */
app.get('/users/:id', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        //console.log(user)
        res.render('users/userDetails', {user}) // To show user details
    }
    catch {
        res.render('users/userDetailserror')
    }
})


/* User home page */
app.get('/users/:id/home', async(req,res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.render('users/userHome', {user}) // Home page
    }
    catch {
        res.render('users/userDetailserror')
    }
}) 


/* Functionality to see blogs created bu user */
app.get('/users/:id/home/My-Blogs', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        const blogs = await Blog.find({user_id:id})
        //console.log(blogs)
        res.render('users/myBlogs',{user,blogs}) // Rendering myBlogs page
    }
    catch {
        console.log('error')
    }
})


/* Functionality to create new blog */
app.get('/users/:id/home/new', (req,res) => {
    const {id} = req.params
    res.render('newBlog', {id}) // id passed to keep it hidden on newBlog page to be used for searching
})


/* POST request to create new Blog recived from newBlog.ejs */
app.post('/users/:id/home', (req,res) => {
    const newBlog = new Blog(req.body)
    console.log(req.body)
    newBlog.save().then(() => { // Saving blogs in database
        console.log('saved')
        res.redirect(`/users/${req.body.user_id}/home/My-Blogs`)
        alert('Blog Saved')
    })
    .catch(err => {
        console.log(err)
    })
})


/* Get request for any other route requested by user */
app.get('*', (req,res) => {
    res.send('The website is still in progrees so hold up!!');
})




/* Currently listening on port 3000 */
app.listen(3000,() => {
    console.log('APP IS LIVE')
})
