const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GET ALL FORUM POSTS
app.get('/', async (req, res) => {
  await Forum.find()
    .then(allPosts => res.json(allPosts))
})

// POST A NEW FORUM
app.post('/', async (req, res) => {
  await Forum.create(req.body)
    .then(newPost => res.json(newPost))
})

// GET ALL USERS
app.get('/users', async (req, res) => {
  await User.find({}, 'username', (err, users)=>{
      res.json(users);
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
        res.json('User registration successful!');
    }
  }); 
});

// SIGN IN USER
app.post('/users/signin', passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/signin'
  })
);

// SERVER
const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));