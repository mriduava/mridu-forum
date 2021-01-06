const passport = require('passport');
const User = require('../models/user');
const { isUserLoggedIn, getPermissionToChangeUser } = require('../acl/permission');

class UserRoutes {
  constructor(expressApp){
    this.app = expressApp
    this.getAllUsers();
    this.getUserById();
    this.registerUser();
    this.loginUser();
    this.logoutUser();
    this.resetPassword();
    this.deleteUser();
  }

  // GET ALL USERS
  getAllUsers(){
    this.app.get('/api/users', isUserLoggedIn, async (req, res) => {
      await User.find({}, 'username' & 'role', (err, users)=>{
          res.json(users);
      })
    })
  }

  // GET USER BY ID
  getUserById(){
    this.app.get('/api/users/:_id', async (req, res)=>{
      try {
        let user = await User.findById(req.params._id);
          if(!user) 
            return res.status(404).send("User not found!");
          res.send(user);
      } catch(e) {
          return res.status(404).send("User not found!");
      }
    })
  }

  // RESET USER PASSWORD
  resetPassword(){
    this.app.put('/api/users/:_id', getPermissionToChangeUser(), async (req, res) => {
      try {
        let user = await User.findById(req.params._id);
        await user.setPassword(req.body.password);
        await user.save();
        res.json('Password reset successful!')
      } catch (e) {
        return res.status(404).send('The user is no longer exist!');
      }
    });
  }

  // DELETE A USER
  deleteUser(){
    this.app.delete('/api/users/:_id', getPermissionToChangeUser(), async (req, res) => {
      try {
        let existUser = await User.findById(req.params._id);
        if (existUser) {
          await User.findByIdAndDelete(req.params._id, (err) => {
            if(err){
              res.redirect("/api/users/" + req.params._id);
            }else{
              res.send("The user has been deleted successfully!");
            }
          });
        }else{
          return res.status(404).send('The user does not exist!');
        }
      } catch (e) {
        return res.status(404).send('Invalid user id!');
      }
    });
  }

  // REGISTER USER
  registerUser(){
    this.app.post('/register', async (req, res) => {
      let role = ""
      let admin = await User.findOne({"role": "admin"})
      !admin? role += "admin":role += "general"
      let newUser= new User({
          username: req.body.username, role}),
          passWord = req.body.password;
      await User.register(newUser, passWord, (err, user) => {
        if(err){
          return res.status(404).send(err.message);
        }else{
          passport.authenticate('local')(req, res, () => {
            res.status(200).send('User registration successful!');
          });
        }
      }); 
    });
  }

  // LOGIN USER
  loginUser(){
    this.app.post('/login', (req, res, next) => {  
      passport.authenticate('local', (err, user, info) => { 
        if (err) { 
          return next(err); 
        } 
        if (!user) { 
          return res.status(404).send(err); 
        } 
        req.logIn(user, (err) => { 
          if (err) { 
            return next(err); 
          } 
          return res.status(200).send('Sign in successful!'); 
        }); 
      })(req, res, next); 
    });
  }

  // LOGOUT USER
  logoutUser(){
    this.app.get('/logout', async (req, res) => {
      await req.logOut();
      req.session.destroy();
      res.redirect('/api/forum');
    });
  }

}

module.exports = UserRoutes;