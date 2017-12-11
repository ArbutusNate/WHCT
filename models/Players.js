var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PlayerSchema = new Schema({

  name: {
    type: String
  },

  link: {
    type: String
  },

  record: {
    type: String
  }

})


var Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;