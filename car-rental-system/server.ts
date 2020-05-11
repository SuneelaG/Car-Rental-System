'use strict';
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");
const users = require("./routes/api/users");
import WebSocket = require('ws');

const app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

const wss = new WebSocket.Server({ port: 3030 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(data);
        client.send(data);
      }
    });
  });
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://Suneela:admin@cluster0-gplwd.mongodb.net/car-rental?retryWrites=true&w=majority",{ useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err: any) => console.log(err));
var dbcon = mongoose.connection;

//store session in Mongo DB
  app.use(
    session({
      name: keys.SESS_NAME,
      secret: keys.SESS_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV == "production",
        maxAge: keys.SESS_LIFETIME
      },
      store: new MongoStore({
        mongooseConnection: dbcon
      })
    })
  );
  app.set('trust proxy', 1);

// Passport middleware
//app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);

// Routes
app.use("/api/users", users);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
