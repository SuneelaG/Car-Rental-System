'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var keys = require("./config/keys");
var users = require("./routes/api/users");
var WebSocket = require("ws");
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// Bodyparser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
var wss = new WebSocket.Server({ port: 3030 });
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
mongoose.connect("mongodb+srv://Suneela:admin@cluster0-gplwd.mongodb.net/car-rental?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(function () { return console.log("MongoDB successfully connected"); })
    .catch(function (err) { return console.log(err); });
var dbcon = mongoose.connection;
//store session in Mongo DB
app.use(session({
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
}));
app.set('trust proxy', 1);
// Passport middleware
//app.use(passport.initialize());
// Passport config
//require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
var port = process.env.PORT || 5000;
app.listen(port, function () { return console.log("Server up and running on port " + port + " !"); });
