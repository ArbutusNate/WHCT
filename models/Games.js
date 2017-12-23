var mongoose = require('mongoose');
var Schema = mongoose.Schema

var GameSchema = new Schema({

  inTournament: {
    type: Schema.Types.ObjectId,
    ref: "Tournament"
  },

  gameNumber: {
    type: Number
  },

  players: [{
      type: Schema.Types.ObjectId,
      ref: "Player"
    }],

  winner: [{
      type: Schema.Types.ObjectId,
      ref: "Player"
    }],

  loser: [{
      type: Schema.Types.ObjectId,
      ref: "Player"
    }]

})


var Game = mongoose.model("Game", GameSchema);

module.exports = Game;