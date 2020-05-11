
import mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema
const BookingSchema = new Schema({
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

export const Booking = mongoose.model("Booking", BookingSchema);
