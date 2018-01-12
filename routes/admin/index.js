const router = require("express").Router();
const mongoose = require("mongoose").set('debug', true);
const Player = require("../../models/Players.js");
const Game = require("../../models/Games.js");
const Tournament = require("../../models/Tournaments.js")
const LiveTInfo = require("../../models/LiveTInfo.js")
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

  router.post(`/save/tournaments/:name/:type/:p1/:p2/:link/:status`, (req, res) => {
    //Create Live info for users, add names (score and faction will be default at this point)
    let data = {
      name: req.params.name,
      p1: {
        name: req.params.p1
      },
      p2: {
        name: req.params.p2
      }
    }
    LiveTInfo.create(data, (error, result) => {
      if(!error){
        console.log(result);
        console.log(`creating temp live info`);
        Tournament.findOneAndUpdate(
          {name: req.params.name},
          { $set: {
            type: req.params.type,
            link: req.params.link,
            player1: req.params.p1,
            player2: req.params.p2,
            isLive: req.params.status,
            currentInfo: result._id
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
      } else {
        return console.log(error);
      }
    })
    //Create the Tournament (for records)
      //Send back data....just Live info
    // Incoming Params (from TourneyZone.js): name, type, p1, p2, link
  });

  // Incoming Params: tName, gameNumber, player1, player1faction, player2, player2faction, winner, loser.
  // AdminControl.js
  router.post(`/savegame/:tId/:tName/:gameNumber/:player1/:player1faction/:player2/:player2faction/:winner/`, (req, res) => {
    let data = {
      'tournament': req.params.tId,
      'gameNumber': req.params.gameNumber,
      'player1': {
        name: req.params.player1,
        faction: req.params.player1faction
      },
      player2: {
        name: req.params.player2,
        faction: req.params.player2faction
      }
    }
    Game.create(data, (error, result) => {
      if(!error){
        res.json(result);
        return console.log(`Adding this game to database`);
      } else {
        return console.log(error);
      }
    })
  })

  //Get Live tournament info on load
  //TourneyZone.js
  router.get(`/liveTournaments/`, (req, res) => {
    console.log('hitting /liveTournaments');
    Tournament.find({isLive : true})
      .populate('currentInfo')
      .exec((error, liveTournaments) => {
      if(!error){
        result = [];
        liveTournaments.map((data, i) => {
          result.push(data.currentInfo);
        })
        res.json(result);
      }
    })
  })

  router.get(`/getcompetitors`, (req, res) => {
    console.log('hitting /getcompetitors');
    Player.find((error, players) => {
      if(!error) {
        res.json(players);
      } else {
        console.log(error);
      }
    })
  })

module.exports = router;