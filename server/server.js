const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser= require('body-parser')
const Forum = require('./models/forum');
const User = require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = "forumdb";
mongoose.connect('mongodb://localhost:27017/' + db, { 
  useUnifiedTopology: true,
  useNewUrlParser: true 
});

app.get('/', async (req, res) => {
  await Forum.find()
    .then(allPosts => res.json(allPosts))
})

app.post('/', async (req, res) => {
  await Forum.create(req.body)
    .then(newPost => res.json(newPost))
})

app.get('/users', async (req, res) => {
  await User.find({}, 'username', (err, users)=>{
      res.json(users);
  })
})

// REGISTER USER
app.post('/users', async (req, res) => {
  let newUser= new User({
      username: req.body.username}),
      passWord = req.body.password;
  await User.register(newUser, passWord, (err, user) => {
    if(err){
      return res.json(err.message);
    }else{
        res.json('User registration successful!');
    }
  }); 
});

const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));