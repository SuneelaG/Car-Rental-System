
import mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema
const ReservationSchema = new Schema({
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

export const Reservation = mongoose.model("Reservation", ReservationSchema);
