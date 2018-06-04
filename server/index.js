require('dotenv').config();

const express = require('express');
const app = express();
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const {auth0Strategy,logout, getUser} = require('./controllers/authCtrl');
const PORT = 3001;



app.use(cors());
app.use(json());

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(auth0Strategy);

passport.serializeUser((user,done)=>{
    done(null, user)
});
passport.deserializeUser((user,done)=>{
    done(null,user)
})

app.get('/login',
passport.authenticate('auth0',{
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
    
})
)

app.get('/students',(req,res)=>{
if(!req.user) res.status(403).json('Not logged In')
else console.log(req.user)
})

app.listen(PORT,()=>{
    console.log(`I am listening on port ${PORT}`)
})