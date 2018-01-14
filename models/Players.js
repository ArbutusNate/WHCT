var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PlayerSchema = new Schema({

  name: {
    type: String,
      default: 0
  },

  link: {
    type: String,
      default: 0
  },

  tRecord: {
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    }
  },

  gRecord: {
    wins: {
      type: Number,
      default: 0
    },
    losses: {
      type: Number,
      default: 0
    }
  },

  history: {
    type: Schema.Types.ObjectId,
    ref: "Game"
  }

})


var Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;