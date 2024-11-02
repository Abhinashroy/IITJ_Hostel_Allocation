const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: String,
  totalRooms: Number,
  availableRooms: Number,
  image: String
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;