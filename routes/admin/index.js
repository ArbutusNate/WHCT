const router = require("express").Router();

  router.post("/newplayer/:newname", (req, res) => {
    console.log("hey, routes working!");
  })


module.exports = router;