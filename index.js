/*
    BlogAddiction

*/


/* Required module for express */
const express = require('express')
const app = express()

/* Required module for path */
const path = require('path')

/* Required module for method overriding used to include requests other than POST and GET in ejs*/   
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

/* Required models to be used */
const User = require('./models/user');
const Blog = require('./models/blog');



const requireLogin = require('./middleware/requireLogin')



const bodyParser = require('body-parser'); 


require('./db/mongoose')



app.use(session({secret:'asecret', resave:false, saveUninitialized:'destroy'}))
app.use(flash())




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




const homePageRoute = require('./routes/home')
const loginPageRoute = require('./routes/login')
const signUpPageRoute = require('./routes/signup')
const logOutRoute = require('./routes/logout')
const deleteProfileRoute = require('./routes/deleteProfile')
const editProfileRoute = require('./routes/editProfile')
const newBlogRoute = require('./routes/newBlog')
const searchUserRoute = require('./routes/searchUser')
const userBlogRoute = require('./routes/userBlogs')
const userProfileRoute = require('./routes/userProfile')
const userHomeRoute = require('./routes/userHome')
const allBlogsRoute = require('./routes/allBlogs')


/* Setting up res.locals for flash */
app.use((req,res,next) => {
    res.locals.messages = req.flash('success_log_in')
    next()
})



app.use('/', homePageRoute)
app.use('/', loginPageRoute)
app.use('/', signUpPageRoute)
app.use('/', logOutRoute)
app.use('/', deleteProfileRoute)
app.use('/', editProfileRoute)
app.use('/', newBlogRoute)
app.use('/', searchUserRoute)
app.use('/', userBlogRoute)
app.use('/', userProfileRoute)
app.use('/', userHomeRoute)
app.use('/', allBlogsRoute)


// app.get('/users/:id/showProfile', async(req,res) => {
//     try {
//         const {id} = req.params
//         const user = await User.findById(id)
//         //console.log(user) 
//         res.render('users/showUserDetails', {user,id}) // To show user details
//     }
//     catch {
//         res.render('users/userDetailserror')
//     }
// })






/* Get request for any other route requested by user */
app.get('*', requireLogin, (req,res) => {
    res.render('pageNotFound')
})



/* Currently listening on port 3000 */
app.listen(3000,() => {
    console.log('APP IS LIVE')
})
