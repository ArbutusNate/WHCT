var mongoose = require('mongoose');
var Schema = mongoose.Schema

var TournamentSchema = new Schema({

  name: {
    type: String
  },

  host: {
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

  games: {
      type: Schema.Types.ObjectId,
      ref: "Game"
    },

  player1: {
      type: Schema.Types.String,
      ref: "Player"
    },

  player2: {
      type: Schema.Types.String,
      ref: "Player"
    },

  isLive: {
    type: Boolean,
    default: false
  },

  currentInfo: {
    type: Schema.Types.ObjectId,
    ref: "LiveTInfo"
  }

})

var Tournament = mongoose.model("Tournament", TournamentSchema);

module.exports = Tournament;