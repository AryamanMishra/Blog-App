/* Required mongoose module */
const mongoose = require('mongoose');



const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/BlogApp';



/* Connecting mongoose to mongodb */
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('CONNECTION CONFIRMED')
})
.catch(err => {
    console.log('Connection refused')
    console.log(err)
})


