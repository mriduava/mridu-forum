const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Forum = require('./models/forum');
const User = require('./models/user');

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


// CHECK IF THE USER IS LOGGED IN 
const isUserLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

// GET ALL FORUM POSTS
app.get('/', async (req, res) => {
  await Forum.find({}, (err, post)=>{
    if (err) {
      res.json(err);
    }else{
      res.json(post);
    }
  })
})

// POST A NEW FORUM
app.post('/newpost', isUserLoggedIn, async (req, res) => {
  await Forum.create(req.body, (err, text)=>{
    if (err) {
      res.json(err.message);
    }else{
      text.author.id = req.user._id;
      text.author.username = req.user.username;
      text.save();
      res.redirect('/')
    }
  })
})

// GET ALL USERS
app.get('/users', async (req, res) => {
  await User.find({}, 'username' & 'role', (err, users)=>{
      res.json(users);
  })
})

// GET USER ID
app.get('/users/:_id', async (req, res)=>{
  await User.findById(req.params._id, (err, user)=>{
    if (err) {
      res.json(err);
    }else{
      res.json(user);
    }
  })
})

// REGISTER USER
app.post('/users/register', async (req, res) => {
  let newUser= new User({
      username: req.body.username,
      role: req.body.role}),
      passWord = req.body.password;
  await User.register(newUser, passWord, (err, user) => {
    if(err){
      return res.json(err.message);
    }else{
      passport.authenticate('local')(req, res, () => {
        res.redirect('/');
      });
    }
  }); 
});

// LOGIN USER
app.post("/users/login", passport.authenticate("local", 
  { successRedirect: "/", 
    failureRedirect: "/users/register", 
    failureMessage: "Invalid username or password" 
  }
));

// SERVER
const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));