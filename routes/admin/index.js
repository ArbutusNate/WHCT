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

  // socketGoLive in AdminControl.js
  router.post(`/save/tournaments/:name/:type/:p1/:p2/:link/:status`, (req, res) => {
    //Create Live info for users, add names (score and faction will be default at this point)
    let data = {
      name: req.params.name,
      tLink: req.params.link,
      p1: {
        name: req.params.p1
      },
      p2: {
        name: req.params.p2
      }
    }
    //Create new liveT document
    LiveTInfo.create(data, (error, newTournament) => {
      if(!error){
        console.log(`creating temp live info`);
        // Create new Tournament document and link new liveT
        Tournament.findOneAndUpdate(
          {name: req.params.name},
          { $set: {
            type: req.params.type,
            link: req.params.link,
            player1: req.params.p1,
            player2: req.params.p2,
            isLive: req.params.status,
            currentInfo: newTournament._id,
            tLink: req.params.link
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
    //Create New Game
    Game.create(
      data,
      (error, gameData) => {
        if(!error){
          //Add Game to current T model
          Tournament.findOneAndUpdate(
            {_id: req.params.tId},
            'games',
            { $push : {
              games: gameData._id
            }},
            (error, tData) => {
              if(!error){
                //Grab LiveInfo for update
                let tempPlayer;
                let otherPlayer;
                if(req.params.winner === "player1"){
                  tempPlayer = "p1"
                  otherPlayer = "p2"
                } else {
                  tempPlayer = "p2"
                  otherPlayer = "p1"
                }
                LiveTInfo.findOne(
                  {_id: tData.currentInfo},
                  (error, extantData) => {
                    if(!error) {
                      console.log(`Getting extant Live Info for ${tempPlayer}`);
                      // console.log(extantData[tempPlayer].score);
                      let winnerData = extantData[tempPlayer];
                      winnerData.score++;
                      winnerData.faction = '';
                      let loserData = extantData[otherPlayer];
                      loserData.faction = '';
                      // console.log(winnerData);
                      //Update score
                      LiveTInfo.findOneAndUpdate(
                        {_id: tData.currentInfo},
                        {
                          [tempPlayer]: winnerData,
                          [otherPlayer]: loserData
                        },
                        (error, updateData) => {
                          if(!error) {
                            let playerArray = [req.params.player1, req.params.player2];
                            // playerArray.map((data, i) => {
                              Player.findOneAndUpdate(
                                {name: playerArray[0]},
                                {$push: {history: gameData._id}},
                                (error, playerResult0) => {
                                  console.log(`updating player 1`);
                                  Player.findOneAndUpdate(
                                    {name: playerArray[1]},
                                    {$push: {history: gameData._id}},
                                    (error, playerResult1) => {
                                      console.log(`updating player 2`);
                                      res.json(gameData);
                                    }

                                  )
                                }
                              )
                            // })
                          }
                        }
                      )
                    } else {
                      return console.log(error);
                    }
                })
                return console.log("Game created/tournament updated.")
              }
            }
          )
          // return console.log(`Adding this game to database`);
      } else {
        return console.log(error);
      }
    })
  })

  // For quickly updating the liveT info.
  // AdminControl.js
  router.post(`/updatefaction/:id/:value/:name`, (req, res) => {
    console.log(`updating liveT faction info`)
    let player = '';
    if(req.params.name === "player1faction") {
      player = "p1";
    } else {
      player = "p2";
    };
    LiveTInfo.findOne(
      {_id : req.params.id},
      player,
      (error, data) => {
        if(!error){
          let tempPlayer = data[player];
          tempPlayer.faction = req.params.value
          if(!error){
            console.log(`Getting extant player info for ${player}`);
            LiveTInfo.findOneAndUpdate(
              {_id: req.params.id},
              {[player]: tempPlayer},
              (error, result) => {
                if(!error) {
                  res.json(result);
                  return console.log(`Updating information of ${player}`);
                } else {
                  return console.log(error);
                }
              }
            )
          } else {
            return console.log(error);
          }
        } else {
          return console.log(error);
        }
      }
      )
  })

  //For quickly updating player win/loss info
  //AdminControl.js
  router.post(`/updateplayer/:winner/:loser/:format`, (req, res) => {
    let format = req.params.format + 'Record';
    console.log(`hitting updateplayer`);
    Player.findOne(
      {name: req.params.winner},
      (error, winnerData) => {
        console.log(winnerData);
        // let formatData = winnerData[]
        let newScore = winnerData[format].wins + 1;
        if(!error){
          Player.findOneAndUpdate(
            {_id: winnerData._id},
            { $set: {[format]: {
              wins: newScore,
              losses: winnerData.gRecord.losses
              }
            }},
            (error, data) => {
              if(!error){
                console.log(`----------winner updated-------`);
                Player.findOne(
                  {name: req.params.loser},
                  (error, loserData) => {
                    if(!error){
                      let newScore = loserData.gRecord.losses + 1;
                      Player.findOneAndUpdate(
                        {_id: loserData._id},
                        { $set : {[format]: {
                            wins: loserData.gRecord.wins,
                            losses: newScore
                          }
                        }},
                        (error, data) => {
                          if(!error){
                            res.json(data);
                            return console.log(`----------loser updated-------`);
                          } else {
                            return console.log(error);
                          }
                        })
                    } else {
                      return console.log(error);
                    }
                  })
              } else {
                return console.log(error);
              }
            })
        } else {
          return console.log(error);
        }
    })
  })

  //For ending and saving a tournament
  //from endSaveTournament() in AdminControl.js
  router.post(`/endtournament/:tId/:liveTId/:winner/:loser`, (req, res) => {
    let tId = req.params.tId;
    let liveTId = req.params.tId;
    let winner = req.params.winner;
    let loser = req.params.loser;
    console.log(`SAVING TOURNAMENT`);
    Tournament.findOneAndUpdate(
      {_id: tId},
      {
        isLive: false,
        winner: winner,
        loser: loser
      },
      {new: true},
      (error, savedTournament) => {
        console.log('SAVED TOURNAMENT');
        console.log(savedTournament);
        LiveTInfo.find(
          {_id: liveTId})
          .remove(() => {
            console.log("Trying to delete old info");
            res.json(savedTournament);
          });
      }
    )
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
    Player.find({}, 'name', (error, players) => {
      if(!error) {
        res.json(players);
      } else {
        console.log(error);
      }
    })
  })

  router.get(`/records/sort/:sort?/`, (req, res) => {
    let sort = req.params.sort;
    Player.
      find({}).
      sort(sort).
      exec((error, playerData) => {
        if(!error) {
          res.json(playerData);
        } else {
          console.log(error);
        }
      })

  })

  router.get(`/records/search/:search?`, (req, res) => {
    let search = req.params.search;
    Player.
      where('name').equals(search).
      exec((error, playerData) => {
        if(!error) {
          res.json(playerData);
        } else {
          console.log(error);
        }
      })
  })

module.exports = router;