const router = require("express").Router()
const googleStrategy  = require("passport-google-oauth20").Strategy
const passport = require("passport")
const jwt = require("jsonwebtoken")
const cookieSession = require("cookie-session")
const db = require("../../db/db")


passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

// passport.use(
//     new googleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback"
//     },(accessToken, refreshToken, profile, cb) => {
//         db.query('select * from users where googleId = ?', [profile.id], (err,user) => {
//             if(err){
//                 cb(err, false);
//             }
//             if(!err && user.length != 0){
//                 console.log("user already exists")
//                 cb(null, user)
//             }
//             else{
//                 db.query("insert into users set userName = ?, userEmail, userImg = ?, googleId = ?", 
//                 [profile.displayName, profile.emails[0].value, profile.photos[0].value, profile.id], (err,userAdded) => {
//                     if(err){
//                         return cb(err,false);
                    
//                     }
//                     else{
//                         db.query('select * from users where googleId = ?',[profile.id], (err,user)=>{
//                             return cb(null,user);
//                             console.log('Here we can assume that the user is successfully SignUp/SignIn')
//                         })
//                     }
//                 })
//             }
//         })
//     }
//     )
// )

passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, cb) => {
        db.query(
          "select * from users where googleId = ?",
          [profile.id],
          (err, user) => {
            if (err) {
              cb(err, false);
            }
            if (!err && user.length != 0) {
              return cb(null, user);
            } else {
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


router.get('/google', passport.authenticate('google', {
    scope: ['profile', "email"]
}));

router.get("/google/callback", passport.authenticate("google",), (req, res) => {

    if(req.user){
      console.log("the use is", req.user[0]);
      const googleAuthToken = jwt.sign({googleAuthToken: req.user[0].googleId}, "rahulnikam", {expiresIn:86400000 })
      res.cookie("googleAuthToken", googleAuthToken, {expires: new Date(Date.now() + 86400 * 1000), httpOnly: true})
      res.redirect("http://localhost:3000")
    }
});


router.get("/currentUser", (req, res) => {
    res.json(req.user);
    console.log("current user", req.user)
  });
  router.get("/logout", (req, res) => {
    req.logOut();
    res.json(req.user);
  });


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