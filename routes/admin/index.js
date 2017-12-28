const router = require("express").Router();
const mongoose = require("mongoose").set('debug', true);
const Player = require("../../models/Players.js");
const Games = require("../../models/Games.js");
const Tournaments = require("../../models/Tournaments.js")
const axios = require("axios");

  router.post("/newplayer/:playerName/:ytLink?", (req, res) => {
    console.log(`playerName:${req.params.playerName} ylLink:${req.params.ytLink}`);
    // Player.create([{name: req.params.playerName}], (err, result) => {
    //   if(err) {
    //     console.log(err);
    //   } else {
    //     console.log("creating new player in DB");
    //     res.json(result);
    //   }
    // })
    Player.findOneAndUpdate({name: req.params.playerName}, {link:req.params.ytLink}, {upsert: true, new: true}, (error, result) => {
      if(!error) {
        res.json(result);
        return console.log("creating new player in DB");
      } else {
        return console.log(error);
      }
    })
  })

module.exports = router;