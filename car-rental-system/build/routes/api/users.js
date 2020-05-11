"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var keys = require("../../config/keys");
var passport = require("passport");
var ObjectId = require('mongodb').ObjectID;
// Load input validation
//const validateRegisterInput = require("../../validation/register");
//const validateLoginInput = require("../../validation/login");
var Middleware_1 = require("../../Middleware");
// Load User model
var User = require("../../models/User").User;
var Booking = require("../../models/Booking").Booking;
var Reservation = require("../../models/Reservation").Reservation;
var WebSocket = require('ws');
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
//const ws = new WebSocket("ws://localhost:3030");
router.post("/register", [Middleware_1.strongMiddleware({ firstname: 'string', lastname: 'string', email: 'string', userid: 'number', password: 'string', type: 'string' })], function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User.findOne({ email: response.locals.strongParams['email'] }).then(function (user) {
            if (user) {
                return response.status(400).json({ email: "Email already exists" });
            }
            else {
                var newUser_1 = new User({
                    userid: response.locals.strongParams['userid'],
                    type: response.locals.strongParams['type'],
                    firstname: response.locals.strongParams['firstname'],
                    lastname: response.locals.strongParams['lastname'],
                    email: response.locals.strongParams['email'],
                    password: response.locals.strongParams['password']
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, function (error, salt) {
                    bcrypt.hash(newUser_1.password, salt, function (error, hash) {
                        if (error)
                            throw error;
                        newUser_1.password = hash;
                        newUser_1
                            .save()
                            .then(function (user) {
                            var message = "Hello " + response.locals.strongParams['firstname'] + ", \n Welcome to Car Rental Portal. Login to book a car for you.\n Thanks.";
                            var msg = {
                                to: response.locals.strongParams['email'],
                                from: 'g.n.suneela@gmail.com',
                                subject: 'Welcome to Car Rental',
                                text: message,
                                html: message,
                            };
                            (function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, sgMail.send(msg)];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })().catch(function (e) {
                                console.error(e);
                                console.log(e.response.body);
                            });
                            response.json(user);
                        })
                            .catch(function (error) { return console.log(error); });
                    });
                });
            }
        });
        return [2 /*return*/];
    });
}); });
router.post("/login", [
    Middleware_1.customMiddleware({ requireCookie: false }),
    Middleware_1.strongMiddleware({ email: 'string', password: 'string', type: 'string' })
], function (req, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, type;
    return __generator(this, function (_a) {
        email = response.locals.strongParams['email'];
        password = response.locals.strongParams['password'];
        type = response.locals.strongParams['type'];
        User.findOne({ type: type, email: email }).then(function (user) {
            if (!user) {
                return response.status(404).json({ emailnotfound: "Email not found" });
            }
            bcrypt.compare(password, user.password).then(function (isMatch) {
                if (isMatch) {
                    var payload = {
                        id: user.id,
                        type: user.type,
                        userid: user.userid,
                        firstname: user.firstname,
                        lastname: user.lastname
                    };
                    // Sign token
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 900 // 15 mins in seconds
                    }, function (err, token) {
                        var message = "Hello " + user.firstname + ", \n You have logged into Car_rental sucessfully.\n Thanks.";
                        var msg = {
                            to: response.locals.strongParams['email'],
                            from: 'g.n.suneela@gmail.com',
                            subject: 'Welcome to Car Rental',
                            text: message,
                            html: message,
                        };
                        (function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sgMail.send(msg)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        })().catch(function (e) {
                            console.error(e);
                            console.log(e.response.body);
                        });
                        response.json({
                            user: user._id,
                            success: true,
                            token: "Bearer " + token
                        });
                    });
                    // req.session.userId = user._id;
                }
                else {
                    return response
                        .status(400)
                        .json({ passwordincorrect: "Password incorrect" });
                }
            });
        });
        return [2 /*return*/];
    });
}); });
router.post("/booking", [Middleware_1.customMiddleware({ requireCookie: false })], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newBooking;
    return __generator(this, function (_a) {
        newBooking = new Booking({
            userid: req.body.userid,
            carname: req.body.carname,
            duration: req.body.duration
        });
        newBooking
            .save()
            .then(function (booking) { return res.json(booking); })
            .catch(function (err) { return console.log(err); });
        return [2 /*return*/];
    });
}); });
router.get("/bookings", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var bookingData;
    return __generator(this, function (_a) {
        bookingData = Booking.find({}).then(function (data) {
            console.log(data);
            return res.status(200).json(data);
        });
        return [2 /*return*/];
    });
}); });
router.delete("/booking", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, bookingData;
    return __generator(this, function (_a) {
        _id = new ObjectId(req.body.id);
        console.log(req.body);
        bookingData = Booking.deleteOne({ _id: _id }).then(function (data) {
            return res.status(200).json(data);
        });
        return [2 /*return*/];
    });
}); });
router.post("/reservation", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newReservation;
    return __generator(this, function (_a) {
        newReservation = new Reservation({
            userid: req.body.userid,
            price: req.body.price,
        });
        //const message = { name: req.body.userid, message: req.body.price };
        newReservation
            .save()
            .then(function (reservation) {
            res.json(reservation);
        })
            .catch(function (err) { return console.log(err); });
        return [2 /*return*/];
    });
}); });
module.exports = router;
