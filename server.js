const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const PORT = process.env.PORT || 8080;
const db = require('./models')

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});


mongoose.connect('mongodb://localhost/kudosApp', { useNewUrlParser: true });

//Routes
const htmlRoutes = require('./routes/htmlRoutes')(app);
const apiRoutes = require('./routes/apiRoutes')(app);


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});

