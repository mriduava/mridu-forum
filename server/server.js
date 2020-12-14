const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Forum = require('./models/forum');

const db = "forumdb";
mongoose.connect('MongoDB://localhost:27017/' + db);

Forum.create({
  title: "Test forum",
  text: "Once upon a time there was a forum"
})

app.get('/', async (req, res) => {
  await res.json({"name": 'MRIDU FORUM'})
})

const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));