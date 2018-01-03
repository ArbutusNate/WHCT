var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PlayerSchema = new Schema({

  name: {
    type: String
  },

  link: {
    type: String
  },

  tRecord: {
    wins: {
      type: Number
    },
    losses: {
      type: Number
    }
  },

  gRecord: {
    wins: {
      type: Number
    },
    losses: {
      type: Number
    }
  },

  history: {
    type: Schema.Types.ObjectId,
    ref: "Game"
  }

})


var Player = mongoose.model("Player", PlayerSchema);

module.exports = Player;