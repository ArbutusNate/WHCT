var mongoose = require('mongoose');
var Schema = mongoose.Schema

var LiveTInfoSchema = new Schema({

  name: String,

  tLink: String,

  p1: {
    name: String,
    score: {
      type: Number,
      default: 0
    },
    faction: {
      type: String,
      default: ''
    }
  },

  p2: {
    name: String,
    score: {
      type: Number,
      default: 0
    },
    faction: {
      type: String,
      default: ''
    }
  }

})

var LiveTInfo = mongoose.model("LiveTInfo", LiveTInfoSchema);

module.exports = LiveTInfo;