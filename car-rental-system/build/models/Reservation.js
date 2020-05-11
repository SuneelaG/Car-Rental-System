"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Create Schema
var ReservationSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    carname: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        default: "0"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.Reservation = mongoose.model("Reservation", ReservationSchema);
