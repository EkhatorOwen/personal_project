require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");

const { logout, getUser } = require("./controllers/authCtrl");
const { saveTeamLead, getProjects } = require("./controllers/teamLeadCtrl");
const port = 3001;

const app = express();

massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(json());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 60
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  // console.log("user  ", user);
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("dese" + user);
  return done(null, user);
});

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid profile email"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      // console.log("Profile  ", profile);
      return done(null, profile);
    }
  )
);

app.get(
  "/login",
  passport.authenticate("auth0"),

  function(req, res) {
    const { user } = req;
    const db = app.get("db");
    db
      .getUserByAuthid(user.id)
      .then(response => {
        if (!response[0]) {
          db
            .addUserByAuthid([
              user.name.givenName,
              user.displayName,
              user.emails[0].value,
              user.id
            ])
            .then(response => {
              //console.log(response[0]);
              req.session.user = response[0];
              res.redirect("http://localhost:3000/#/setup/step1");
            })
            .catch(console.log);
        } else {
          res.redirect("http://localhost:3000/#/dashboard/viewproject");
        }
      })
      .catch(console.log);
  }
);

app.get("api/projects", getProjects);

//app.get("/api/me", getUser);

app.get("/api/test", (req, res) => {
  res.status(200).json(req.user);
});
app.get("/logout", logout);

app.get("/api/profile", getUser);

app.post("/api/teamlead", saveTeamLead);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
