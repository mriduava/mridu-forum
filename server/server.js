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
const Comment = require('./models/comment');

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
app.get('/api/forum', async (req, res) => {
  await Forum.find({}, (err, post)=>{
    if (err) {
      res.json(err);
    }else{
      res.json(post);
    }
  })
})

// GET FORUM ARTICLE BY ID
app.get('/api/forum/:_id', async (req, res)=>{
  try {
    let forumArticle = await Forum.findById(req.params._id)
      .populate('comments');
      if(!forumArticle) 
        return res.status(404).send("Article not found!");
      res.send(forumArticle);
  } catch(e) {
      return res.status(404).send("Article not found!");
  }
})

// POST A NEW FORUM
app.post('/api/forum/newpost', isUserLoggedIn, async (req, res) => {
  await Forum.create(req.body, (err, text)=>{
    if (err) {
      res.json(err.message);
    }else{
      text.author.id = req.user._id;
      text.author.username = req.user.username;
      text.save();
      res.redirect('/api/forum')
    }
  })
})

// POST COMMENT
app.post('/api/forum/:_id/comments', isUserLoggedIn, async (req, res)=>{
  let forumArticle = await Forum.findById(req.params._id);
  await Comment.create(req.body, (err, comment)=>{
    if (err) {
      res.json(err.message);
    }else{
      comment.author.id = req.user._id;
      comment.author.username = req.user.username;
      forumArticle.comments.push(comment);
      comment.save();
      forumArticle.save();
      res.redirect('/api/forum/' + req.params._id)
    }
  })
})

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