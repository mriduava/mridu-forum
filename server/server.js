const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user');
const ForumRoutes = require('./routes/ForumRoutes');

// CONNECT MONGODB
const db = "forumdb";
mongoose.connect('mongodb://localhost:27017/' + db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true 
});

// BODY-PARSER CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// SESSION CONFIG
app.use(session({
    secret: 'mriduava',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        url: 'mongodb://localhost:27017/' + db,
        touchAfter: 24 * 3600
    })
}));

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

new ForumRoutes(app);

// GET ALL USERS
app.get('/api/users', async (req, res) => {
  await User.find({}, 'username' & 'role', (err, users)=>{
      res.json(users);
  })
})

// GET USER BY ID
app.get('/api/users/:_id', async (req, res)=>{
  try {
    let user = await User.findById(req.params._id);
      if(!user) 
        return res.status(404).send("User not found!");
      res.send(user);
  } catch(e) {
      return res.status(404).send("User not found!");
  }
})

// REGISTER USER
app.post('/register', async (req, res) => {
  let newUser= new User({
      username: req.body.username,
      role: req.body.role}),
      passWord = req.body.password;
  await User.register(newUser, passWord, (err, user) => {
    if(err){
      return res.json(err.message);
    }else{
      passport.authenticate('local')(req, res, () => {
        res.redirect('/api/forum');
      });
    }
  }); 
});

// LOGIN USER
app.post("/login", passport.authenticate("local", 
  { successRedirect: "/api/forum", 
    failureRedirect: "/register", 
    failureMessage: "Invalid username or password" 
  }
));

// LOGOUT USER
app.get('/logout', async (req, res) => {
  await req.logOut();
  req.session.destroy();
  res.redirect('/api/forum');
});

// INVALID URL
app.get('*', async (req, res) => {
  await res.status(404).send('Page not found!');
});

// SERVER
const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));