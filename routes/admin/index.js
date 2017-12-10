const router = require("express").Router();
const mongoose = require("mongoose").set('debug', true);
const axios = require("axios");

  router.post("/newplayer/:playerName/:ytLink?", (req, res) => {
    console.log("hey, routes working!");
    console.log(`playerName:${req.params.playerName} ylLink:${req.params.ytLink}`);
  })


module.exports = router;