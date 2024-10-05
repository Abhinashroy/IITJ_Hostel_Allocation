const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: String,
    roolNumber: String,
    roomNo: Number,
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' }
    });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;