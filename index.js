const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')


const User = require('./models/user');
const Blog = require('./models/blog');

const mongoose = require('mongoose');
const alert = require('alert');
mongoose.connect('mongodb://localhost:27017/BlogApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})

app.use(express.static(__dirname + '/public'));
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


app.get('/', (req,res) => {
    res.render('home')
})



app.get('/users/existing', (req,res) => {
    res.render('users/existing')
})

app.post('/existing', (req,res) => {
    let userTocheck = req.body
    const findUser = User.findOne({name:userTocheck.name,age:parseInt(userTocheck.age),email:userTocheck.email})
        .then((data) => {
            //alert(`Signed in successfully`)
            res.redirect(`/users/${data._id}/home`)
            console.log('success')
            console.log(data)
        })
        .catch (err => {
            alert('User by these credentials does not exist, please sign up')
            res.redirect('/')
            //console.log(err)
            //console.log('fail')
        })
})

app.get('/users/new', (req,res) => {
    res.render('users/newUser')
})
app.post('/user', (req,res) => {
    const newUser = new User(req.body)
    newUser.save().then(() => {
        console.log('User logged in')
        console.log(req.body)
    })
    .catch(err => {
        console.log('error')
    })
    res.redirect(`/users/${newUser._id}/home`)
})

app.get('/users/:id', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        console.log(user)
        res.render('users/userDetails', {user})
    }
    catch {
        res.render('users/userDetailserror')
    }
})


app.get('/users/:id/home', async(req,res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.render('users/userHome', {user})
    }
    catch {
        res.render('users/userDetailserror')
    }
}) 

app.get('/users/:id/home/My-Blogs', async(req,res) => {
    try {
        const {id} = req.params
        const user = await User.findById(id)
        const blogs = await Blog.find({user_id:id})
        console.log(blogs)
        res.render('users/myBlogs',{user,blogs})
    }
    catch {
        console.log('error')
    }
})

app.get('/users/:id/home/new', (req,res) => {
    const {id} = req.params
    res.render('newBlog', {id})
})



app.post('/users/:id/home', (req,res) => {
    const newBlog = new Blog(req.body)
    console.log(req.body)
    newBlog.save().then(() => {
        console.log('saved')
        res.redirect(`/users/${req.body.user_id}/home/My-Blogs`)
        alert('Blog Saved')
    })
    .catch(err => {
        console.log(err)
    })
})


app.get('*', (req,res) => {
    res.send('The website is still in progrees so hold up!!');
})







app.listen(3000,() => {
    console.log('APP IS LIVE')
})
