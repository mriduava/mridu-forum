const Thread = require('../models/thread');
const User = require('../models/user');

module.exports = {

  // CHECK IF THE USER IS LOGGED IN 
  isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.json('You are not logged in!');
  },

  // GET PERMISSION BY OWNERSHIP OR BY ROLE
  getPermissionToChange(){
    return (req, res, next) => {
      if(req.isAuthenticated()){
        Thread.findById(req.params._id, (err, article) => {
          if(err){
            res.json('This article does not exist!');
          }else{
            if((article.author.id.equals(req.user._id))||
              (req.user.role === 'admin') || (req.user.role === 'moderator')){
              next();
            }else{
              res.json('You are not allowed to make a change!');
            }
          }
        });
      }else{
        res.json('Please loggin first!');
      }
    }
  },

  // GET ADMIN POWER TO CHANGE USER
  getPermissionToChangeUser(){
    return (req, res, next) => {
      User.findOne(req.params.id, (err, user) => {
        if(err){
          res.json('The user does not exist!');
        }else{
          if((req.user.role === 'admin')){
            next();
          }else{
            res.json('Sorry, You do not have permission to access!');
          }
        }
      });  
    }
  }


}