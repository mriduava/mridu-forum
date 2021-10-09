const mongoose = require('mongoose');
const bodyParser= require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const User = require('../models/user');

class DependencyConfig {

  constructor(expressApp){
    this.app = expressApp

    // MONGODB CONFIG
    const db = "forumdb";
    const mongodbatlas = "mongodb+srv://mridu:armitaava@forum.zg1y8.mongodb.net/mriduforum?retryWrites=true&w=majority"
    // mongoose.connect('mongodb://localhost:27017/' + db, { 
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false
    // });

     mongoose.connect(mongodbatlas, { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    // BODY-PARSER CONFIG
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // SESSION CONFIG
    // this.app.use(session({
    //     secret: 'mriduava',
    //     saveUninitialized: false,
    //     resave: false,
    //     store: new MongoStore({
    //         url: 'mongodb://localhost:27017/' + db,
    //         touchAfter: 24 * 3600
    //     })
    // }));

    this.app.use(session({
      secret: 'mriduava',
      saveUninitialized: false,
      resave: false,
      store: new MongoStore({
          url: mongodbatlas,
          touchAfter: 24 * 3600
      })
    }));

    // PASSPORT CONFIG
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
  }

}

module.exports = DependencyConfig;