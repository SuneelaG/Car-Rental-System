"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Create Schema
var BookingSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    carname: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.Booking = mongoose.model("Booking", BookingSchema);
