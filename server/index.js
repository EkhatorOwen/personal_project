require("dotenv").config();


const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const massive = require("massive");
const Auth0Strategy = require("passport-auth0");
const Pusher = require('pusher');
const sgMail = require('@sendgrid/mail')

const path = require('path')



const { logout, getUser } = require(`${__dirname}/controllers/authCtrl`);
const {
  saveTeamLead,
  getProjects,
  updateProfile,
  saveProject,

} = require(`${__dirname}/controllers/teamLeadCtrl`);
const { addPeople, getPeopleProject, deletePeople } = require(`${__dirname}/controllers/peopleCtrl`)
const { addEvent,getEvent } = require('./controllers/eventsCtrl')
const { getMessages, addMessage, deleteMessage,updateMessage } = require(`${__dirname}/controllers/messageCtrl`)
const { deleteProject, getProjectPictures } = require(`${__dirname}/controllers/projectCtrl`)
const { saveJobTitle } = require(`${__dirname}/controllers/teamMemberCtrl`)
const { assignTask,getTask,deleteTask,getUserTask,updateTask }  = require(`${__dirname}/controllers/taskCtrl`)

const { getProjUsers } = require(`${__dirname}/controllers/chatCtrl`)

const port = process.env.PORT || 3001;

const app = express();



//comment this out for local
//app.use(express.static(`${__dirname}/../build`))


massive(process.env.CONNECTION_STRING)
  .then(db => app.set("db", db))
  .catch(console.log);

app.use(bodyParser.json());
app.use(cors());

const pusher = new Pusher({
      appId: process.env.APP_ID,
      key: process.env.KEY,
      secret: process.env.SECRET,
      cluster: process.env.CLUSTER,
      encrypted: true
    });



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

app.get("/login", passport.authenticate("auth0"), function(req, res) {
  const { user } = req;
  const db = app.get("db");

  db.getUserByEmail([user.emails[0].value])
      .then(resp=>{
        if(!resp[0]){


          const msg ={
            to: `${user.emails[0].value}`,
            from: `collaborate.com`,
            subject: 'Collaborate!',
            text: `Hi ${user.name.givenName}, welcome to Collaborate! With Collaborate, you can create projects, add people to projects, assign task, chat with them and lots more.`,
            html: `Hi ${user.name.givenName}, welcome to Collaborate! With Collaborate, you can create projects, add people to projects, assign task to them, chat with them and lots more.`
        }
        sgMail.send(msg)
              db.addUserByAuthid([
                user.name.givenName,
                user.displayName,
                user.emails[0].value,
                user.id,
                user.picture
              ])
                .then(response => {
                  //console.log(response[0]);
                  req.session.user = response[0];
                  //for local
                 // res.redirect("http://localhost:3000/#/setup/step1");
                  res.redirect("/#/setup/step1")
                })
                .catch(console.log);

        }
        else if(resp[0].authid){
             // console.log(resp[0])

              req.session.user = resp[0];
              //for local
              res.redirect("http://localhost:3000/#/dashboard/viewproject");
            // res.redirect("/#/dashboard/viewproject");
        }
        else{
                
              db.updateUserDetails([user.name.givenName,user.displayName,user.id,user.picture,resp[0].email])
                  .then(re=> {  
                   req.session.user = re[0]
                   // res.redirect("http://localhost:3000/#/setup/welcome"); 
                   res.redirect("/#/setup/welcome"); 
                  })
        }
      })
 
});

app.get("/api/projects", getProjects);

//app.get("/api/me", getUser);

app.get("/api/test", (req, res) => {
  res.status(200).json(req.user);
});
app.get("/logout", logout);

app.get("/api/profile", getUser);

app.post("/api/teamlead", saveTeamLead);

app.post("/api/saveProject", saveProject);

app.post("/api/updateProfile", updateProfile);

app.post('/api/addPeople', addPeople)

app.get('/api/getEvents/:id', getEvent)

app.post('/api/addEvent', addEvent)

app.get('/api/getMessages/:id',getMessages)

app.post('/api/addMessage', addMessage)

app.put('/api/updateMessage',updateMessage)

app.delete('/api/deleteMessage/:projid/:messageid',deleteMessage)

app.delete('/api/deleteProject/:id',deleteProject)

//team member stuff here
app.post('/api/saveJobTitle',saveJobTitle)

app.get('/api/project/pictures/:id',getProjectPictures)

app.delete('/api/deletePeople/:user_id/:proj_id',deletePeople)


app.get('/api/getPeopleProject/:id',getPeopleProject)

//task stuff here
app.post('/api/assignTask/:proj_id',assignTask)

app.get('/api/getTasks/:proj_id',getTask)

app.delete('/api/deleteTask/:task_id',deleteTask)

app.get('/api/getUserTask/:proj_id',getUserTask)

app.put('/api/updateTask/:task_id',updateTask)

//chat stuff here

app.get('/api/getProjUsers',getProjUsers)


//chat stuff here

  app.post('/message', (req, res) => {
      const payload = req.body;
      pusher.trigger('chat', 'message', payload);
      res.send(payload)
    });


    //comment this out when local
    // app.get('*',(req,res)=>{
    //   res.sendFile(path.join(__dirname,'../build/index.html'))
    // })

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
