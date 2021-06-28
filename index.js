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
const bodyParser = require('body-parser'); 


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


app.use(express.json());

/* Use method of express to convert the req object to readable form */
app.use(express.urlencoded({extended:true}))

/* Use method of express to invoke methodOverride with key name '_method' */
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({
    extended: true
  }));


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
                console.log('new user logged in')
            })
            .catch(err => {
                console.log('error')
                console.log(err)
            })
            res.redirect(`/users/${newUser._id}/home`) // Redirecting to new account
            alert('New Account created succesfully')
        }
    }
    catch {
        console.log('Sign Up error!!!!')
        res.redirect('/users/userDetailserror') // Error page
    }
})


/* Showing user profile page */
app.get('/users/:id/profile', async(req,res) => {
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


app.get('/users/:id/showProfile', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        //console.log(user) 
        res.render('users/showUserDetails', {user,id}) // To show user details
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
        console.log('error in myblogs')
    }
})


app.get('/users/search/:id/Blogs', async(req,res) => {
    const id = req.params.id
    const user = await User.findById(id)
    const blogs = await Blog.findById(id)
    res.render('showBlogs', {user,blogs})
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
    })
    .catch(err => {
        console.log(err)
    })
})


/* GET request to edit user profile */
app.get('/users/:id/profile/edit', async(req, res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.render('users/editDetails', {user})
        //console.log('Profile updated')
    }
    catch{
        console.log('error in edit')
    }
})


/* POST request to edit user details */
app.put('/edit', async(req,res) => {
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


/* DELETE request to delete a user profile */
app.delete('/delete', async(req,res) => {
    const id = req.body._id
    const user = await User.findByIdAndDelete(id)
    res.redirect('/')
})


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
app.post('/users/searchUser', async(req,res) => {
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





/* Get request for any other route requested by user */
app.get('*', (req,res) => {
    res.send('The website is still in progrees so hold up!!');
})



/* Currently listening on port 3000 */
app.listen(3000,() => {
    console.log('APP IS LIVE')
})
