const router = require("express").Router();
const mongoose = require("mongoose").set('debug', true);
const Player = require("../../models/Players.js");
const Game = require("../../models/Games.js");
const Tournament = require("../../models/Tournaments.js")
const axios = require("axios");

  router.post(`/newplayer/:playerName/:ytLink?`, (req, res) => {
    console.log(`playerName:${req.params.playerName} ylLink:${req.params.ytLink}`);
    Player.findOneAndUpdate({name: req.params.playerName},
      {link:req.params.ytLink},
      {upsert: true, new: true},
      (error, result) => {
        if(!error) {
          res.json(result);
          return console.log(`Creating a new player in DB.`);
        } else {
          return console.log(error);
        }
    })
  });

  router.post(`/save/tournaments/:name/:type/:p1/:p2/:link`, (req, res) => {
    // Incoming Params (from TourneyZone.js): name, type, p1, p2, link
    Tournament.findOneAndUpdate({name: req.params.name},
      { $set: {
        type: req.params.type,
        link: req.params.link,
        players: [req.params.p1, req.params.p2],
      }},
      {upsert: true, new: true},
      (error, result) => {
        if(!error) {
          res.json(result);
          return console.log(`Creating a new tournament in DB.`)
        } else {
          return console.log(error);
        }
      }
    )
  });

  // Incoming Params: tName, gameNumber, player1, player1faction, player2, player2faction, winner, loser.
  router.post(`/savegame/:tName/:gameNumber/:player1/:player1faction/:player2/:player2faction/:winner/:loser`)


module.exports = router;