const express = require('express');
const app = express();

const db = "mriduforum";

app.get('/', (req, res)=>{
  res.json({"name": 'MRIDU FORUM'})
})

const PORT = process.env.PORT || 3200;
app.listen(PORT, console.log(`SERVER IS RUNNING AT PORT ${PORT}`));