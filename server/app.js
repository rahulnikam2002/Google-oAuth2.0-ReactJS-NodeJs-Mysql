// Importing all required libraries
const express = require("express")
const cors = require("cors")
const db = require("./db/db.js")
const cookieSession = require("cookie-session")
const passport = require("passport")


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

app.use(passport.initialize())
app.use(passport.session());

db.getConnection((err,connection) => {
    console.log("Connection to database is successful")
})


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})