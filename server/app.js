// Importing all required libraries
const express = require("express")
const cors = require("cors")
const db = require("./db/db.js")
const cookieSession = require("cookie-session")
const passport = require("passport")
require("dotenv").config()


// creating our app using express
const app = express()

// Setting PORT
const PORT = process.env.PORT || 5000;


// Adding required middlewares
app.use(cookieSession({
    name: 'authSession',
    keys: ["askduhakdnkbiygvhbad7a6s*&^*S^D8asdbk"],
    maxAge: 24*60*60*100
}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(passport.initialize())
app.use(passport.session());

db.getConnection((err,connection) => {
    console.log("Connection to database is successful")
})

app.use('/auth', require('./Routers/auth/passport'));


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})