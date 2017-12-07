const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const adminRoutes = require("./routes/admin/admin.js");
// const userRoutes = require("./routes/user/user.js");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
   process.env.MONGODB_URI ||
  "mongodb://localhost/boardgame",
  {
    useMongoClient: true
  }
);
// Start the API server
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
// const server = app.set(PORT, function() {
//   console.log(process.env.PORT)
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

// const io = require('socket.io')(server);

// io.on("connection", socket => {
//   socket.on("notification", object => {
//     console.log("notification received")
//     console.log(object);
//   })

// });

// let socketExport = module.exports

// socketExport.updateUser = function(uid, valToUpdate){
//   io.emit(uid, valToUpdate);
// }
