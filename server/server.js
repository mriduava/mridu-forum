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
const UserRoutes = require('./routes/UserRoutes');

// CONNECT MONGODB
const db = "forumdb";
mongoose.connect('mongodb://localhost:27017/' + db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
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
new UserRoutes(app);

// INVALID URL
app.get('*', async (req, res) => {
  await res.status(404).send('Page not found!');
});

// SERVER
const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));