//Importing all required packages
const router = require("express").Router()
const googleStrategy  = require("passport-google-oauth20").Strategy
const passport = require("passport")
const jwt = require("jsonwebtoken")
const cookieSession = require("cookie-session")
const db = require("../../db/db")

//serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((user, done) => {
    done(null, user);
})

//deserialize are used to set id as a cookie in the user's browser and to get the id from the cookie when it then used to get user info in a callback.
passport.deserializeUser((user, done) => {
    done(null, user);
})


//Configuring google's strategy 
passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,  //passing CLIENT ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, //Passing CLIENT SECRET, You can get this form https://console.cloud.google.com/, to know more go on line 113 of this file.
        callbackURL: "/auth/google/callback",  //This means after signin on what route google should redirect
      },
      (accessToken, refreshToken, profile, cb) => {  //After successful signin, we have access of these thing which are in parameters
          // we are checking wehther the user is already added to our database or not, if already exist we can directly give a callback age we can redirect the user to any page we are redirecting it on home page, this functionality is not written in this function, you can check line no. 72.
        db.query(
          "select * from users where googleId = ?",
          [profile.id],
          (err, user) => {
            if (err) {
              cb(err, false);
            }
            if (!err && user.length != 0) {  // checking whether user exist or not
              return cb(null, user);
            } else {
                // if user dosen't exist, we are adding the user to database
              db.query(
                "insert into users set userName = ?, googleId = ?, userImg = ?, userEmail = ?",
              [profile.displayName, profile.id, profile.photos[0].value, profile.emails[0].value],
                (err, userAdded) => {
                  if (err) {
                    return cb(err, false);
                    console.log("err dectected")
                  } else {
                      db.query(
                          "select * from users where googleId = ?",
                          [profile.id],
                          (err, user) => {
                              return cb(null, user);
                              console.log("Login/Sign in successfully");
  
                          })
  
                  }
                }
              );
            }
          }
        );
      }
    )
  );


// Passing google authenticate method as a middleware
router.get('/google', passport.authenticate('google', {
    scope: ['profile', "email"]
}));

// after signin the google will redirect to this route as we have added this route in callbace URL on line no 26
router.get("/google/callback", passport.authenticate("google",), (req, res) => {
    //If user exist than ...
    if(req.user){
      console.log("the use is", req.user[0]); //Just for debugging
        //Creating a unique token using sign method which is provided by JWT, remember the 2nd parameter should be a secret key and that should have atleast length of 20, i have just passed 'rahulnikam' but you should not do the same and this should be kept in environment variable so that no one can see it
      const googleAuthToken = jwt.sign({googleAuthToken: req.user[0].googleId}, "rahulnikam", {expiresIn:86400000 })
      //res.cookie will set a cookie in user's header (i mean in users http header😂)
      // we are saying that create a cookie with a name of googleAuthToken and we are passing the token that we generated on line no 80, and the 3rd parameter is the expire of that cookie.
      res.cookie("googleAuthToken", googleAuthToken, {expires: new Date(Date.now() + 86400 * 1000), httpOnly: true})
        // we are now redirecting the user to localhost:3000 which is our frontend
      res.redirect("http://localhost:3000")
    }
});

// we are making a request fron frontend to localhost:5000/auth/login/success, and we are sending user data (remember that don't pass any confidential data line user password or any other)
  router.get("/login/success", (req, res) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: [req.user[0].userName, req.user[0].userEmail, req.user[0].userImg]
      });
    }
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.json({
      logout: req.user
    })
  });

module.exports = router



/*
   1. Go to https://console.cloud.google.com/
   2. Create a new project by any name
   3. go to OAuth consent screen and add required information like (App Name & Email)
   4. now go to credential tab and click create credential and then click on OAuth client ID.
   5. Select application type as web application.
   6. after that let name field remains as it is or you can change it... depends on you but the main thing is you should add Authorized JavaScript origins as address of your frontend otherwise it will give you an error.
   7. Authorized redirect URIs should be URIs1 should be address of frontend in our case its localhost:3000 and URIs2 should be address of server with the route on which google should redirect in our case its http:localhost:5000/auth/google/callback
   8.  click on save and it will ask few mor things you can skip those and at the end you will get CLIENT ID & CLIENT SECRET and thats what we have added on line no 24 and 25.
*/
