const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let usersSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
    required: "username is Required"
  },

  kudos: [
    {
      type: Schema.Types.ObjectId,
      ref: "kudos"
    }
  ]
});

const users = mongoose.model("users", usersSchema);

module.exports = users;