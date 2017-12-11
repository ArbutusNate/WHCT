const router = require("express").Router();
const mongoose = require("mongoose").set('debug', true);
const Player = require("../../models/Players.js");
const Games = require("../../models/Games.js");
const Tournaments = require("../../models/Tournaments.js")
const axios = require("axios");

  router.post("/newplayer/:playerName/:ytLink?", (req, res) => {
    console.log(`playerName:${req.params.playerName} ylLink:${req.params.ytLink}`);
    Player.create([{"name": req.params.playerName}, {"link": req.params.ytLink}], (err, result) => {
      if(err) {
        return console.log(err);
      } else {
        res.json(result);
        console.log("creating new player in DB")
      }
    })
  })


module.exports = router;