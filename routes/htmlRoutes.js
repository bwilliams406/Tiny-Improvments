const express = require("express");
const path = require('path');
const router = express.Router();


module.exports = function (app) {

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


}