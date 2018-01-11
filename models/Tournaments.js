var mongoose = require('mongoose');
var Schema = mongoose.Schema

var TournamentSchema = new Schema({

  name: {
    type: String
  },

  link: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  type: {
    type: String
  },

  games: [{
      type: Schema.Types.ObjectId,
      ref: "Game"
    }],

  players: [{
      type: Schema.Types.String,
      ref: "Player"
    }]

})

var Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;