const Forum = require('../models/forum');

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
        Forum.findById(req.params._id, (err, article) => {
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
  }


}