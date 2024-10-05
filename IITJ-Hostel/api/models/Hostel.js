const mongoose = require('mongoose');

const hostelSchema = new mongoose.Schema({
  name: String,
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }]
});

const Hostel = mongoose.model('Hostel', hostelSchema);

module.exports = Hostel;