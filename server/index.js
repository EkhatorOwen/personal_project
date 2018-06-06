require("dotenv").config();

const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");

const { logout, getUser } = require("./controllers/authCtrl");
const { saveTeamLead } = require("./controllers/teamLeadCtrl");
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
  console.log("dese" + user);
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
      const db = app.get("db");
      db
        .getUserByAuthid(profile.id)
        .then(response => {
          if (!response[0]) {
            db
              .addUserByAuthid([
                profile.name.givenName,
                profile.displayName,
                profile.emails[0].value,
                profile.id
              ])
              .then(res => {
                //    console.log("res  ", res);

                return done(null, res[0]);
              })
              .catch(console.log);
          } else {
            // console.log("response ", response[0]);

            return done(null, response[0]);
          }
        })
        .catch(console.log);
    }
  )
);

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/setup/step1",
    failureRedirect: "/login"
  })
);

app.get("/api/me", getUser);

app.get("/api/test", (req, res) => {
  console.log("hit");
  console.log("REQ ", req.user);
  res.status(200).json(req.user);
});
app.get("/logout", logout);

app.post("/api/teamlead", saveTeamLead);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
