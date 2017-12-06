const router = require("express").Router();

  router.post("/newplayer/:newnames", (req, res) => {
    console.log("hey, routes working!");
  })


module.exports = router;