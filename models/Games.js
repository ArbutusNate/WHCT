var mongoose = require('mongoose');
var Schema = mongoose.Schema

var GameSchema = new Schema({

  tournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament"
  },

  gameNumber: {
    type: Number
  },

  player1: {
      name: {
        type: String,
        ref: "Player"
        },
      faction: {
        type: String
      },
      isWinner: {
        type: Boolean
      }
    },

  player2: {
      name: {
        type: String,
        ref: "Player"
        },
      faction: {
        type: String
      },
      isWinner: {
        type: Boolean
      }
    },

  winner: {
      type: Schema.Types.ObjectId,
      ref: "Player"
    },

  loser: {
      type: Schema.Types.ObjectId,
      ref: "Player"
    }

})


var Game = mongoose.model("Game", GameSchema);

module.exports = Game;