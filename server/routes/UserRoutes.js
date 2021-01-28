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
    this.searchUser();
    this.setUserRole();
  }

  // GET ALL USERS
  getAllUsers(){
    this.app.get('/api/users', isUserLoggedIn, getPermissionToChangeUser(), async (req, res) => {
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
    this.app.put('/api/users/:_id', isUserLoggedIn, getPermissionToChangeUser(), async (req, res) => {
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
    this.app.delete('/api/users/:_id', isUserLoggedIn, getPermissionToChangeUser(), async (req, res) => {
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

  //CHECK WHITE SPACE, & LENGTH OF THE STRING
  isValidData = (value, stringLength) => {
    let inValid = new RegExp('^[_A-z0-9]{1,}$');
    let result = inValid.test(value);
    if(result && value.length >= stringLength){
     return true;
    }
    return false;
  }

  // REGISTER USER
  registerUser(){
    this.app.post('/register', async (req, res) => {
      let role = ""
      let admin = await User.findOne({"role": "admin"})
      !admin? role += "admin":role += "general"

      let username = req.body.username
      if (!this.isValidData(username, 3)) {
        return res.status(404).send("Username must be at least 3 characters without space!");;
      }
      let password = req.body.password
      if (!this.isValidData(password, 6)) {
        return res.status(404).send("Password must be at least 6 characters without space!");
      }
 
      let newUser= new User({
          username, role}),
          passWord = password;
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
    this.app.post('/login', async (req, res, next) => {  
      await passport.authenticate('local', (err, user, info) => { 
        if (err) { 
          return next(err); 
        } 
        if (!user) { 
          return res.status(404).send("Username or Password incorrect!"); 
        } 
        req.logIn(user, (err) => { 
          if (err) { 
            return next(err); 
          } 
          return res.status(200)
            .send({id: user._id, username: user.username, role: user.role}); 
        }); 
      })(req, res, next); 
    });
  }

  // LOGOUT USER
  logoutUser(){
    this.app.get('/logout', async (req, res) => {
      await req.logOut();
      req.session.destroy();
      res.send('User is logged out!');
    });
  }

  //SEARCH USER
  searchUser(){
    this.app.get("/search/user", isUserLoggedIn, async (req, res) => {
      let query = {
        $or: [{ username: req.query.username },
          { role: req.query.role}]
      }
      await User.find(query, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
      });
    });
  }

  // SET USER ROLE
  setUserRole(){
    this.app.put('/api/users', isUserLoggedIn, getPermissionToChangeUser(), async (req, res) => {
      await User.updateOne(
        { username: req.query.username },
        { $set: { role: req.body.role } }, (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.json(result);
          }
        }
      );
    });
  }

}

module.exports = UserRoutes;