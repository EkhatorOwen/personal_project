require('dotenv').config();

const express = require('express');
const app = express();
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const massive = require('massive'); 

const {auth0Strategy,logout, getUser} = require('./controllers/authCtrl');
const { saveTeamLead } = require('./controllers/teamLeadCtrl')
const port = 3001;



app.use(cors());
app.use(json());

app.use(
    session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60*60
    }
}))

massive(process.env.CONNECTION_STRING)
        .then(db=>app.set('db',db))
        .catch(console.log);
    

        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(auth0Strategy);
        
        passport.serializeUser((user, done) => {       
          const db = app.get('db');
          db 
            .getUserByAuthid([user.id])
            .then(response => {
              if (!response[0]) {
                  //console.log(user);
                db
                  .addUserByAuthid([user.displayName, user.name.givenName,user.user_id,user.emails[0].value])
                  .then(res =>{return  done(null, res[0])} )
                  .catch(console.log);
              } else { return done(null, response[0])};
            })
            .catch(console.log);
        });
        
        passport.deserializeUser((user, done) =>{
          
          done(null, user)});

      
        // app.use((req, res, next) => {
        //   if (!req.session.user) { req.session.user = []};
        //   next();
        // });
        
        app.get(
          '/login',
          passport.authenticate('auth0', {
            successRedirect: 'http://localhost:3000/#/setup/step1',
            failureRedirect: '/login'
          })
        );

        // app.use((req, res, next) => {
        //   // if (!req.session.username) req.session.username = ;
       
        // });
        
        app.get('/api/me', getUser);
        app.get('/logout', logout);

      //   app.use((req, res, next) => {
      //     console.log(req)
      //    next();
      //  });


        app.post('/api/teamlead',saveTeamLead)
        
        app.listen(port, () => {
          console.log(`Listening on port: ${port}`);
        });