const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const adminRoutes = require("./routes/admin/admin.js");
// const userRoutes = require("./routes/user/user.js");
const routes = require("./routes");
const app = require('express')();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent appointments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
   process.env.MONGODB_URI ||
  "mongodb://localhost/tournaments",
  {
    useMongoClient: true
  }
);
// Start the API server
const server = app.listen(PORT, () => {
    console.log(`🌎 Our app is running on port ${ PORT }`);
});
// const server = app.set(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connection', object => {
    console.log("n received")
    console.log(object);
  })

});
