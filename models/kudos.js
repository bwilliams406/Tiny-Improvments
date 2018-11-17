const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let kudosSchema = new Schema({
  title: String,
  body: String,
  from: String,
  to: String,
});

const kudos = mongoose.model("kudos", kudosSchema);

module.exports = kudos;