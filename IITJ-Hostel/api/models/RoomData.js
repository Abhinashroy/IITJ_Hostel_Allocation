const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomNo: String,
    name: String,
    rollNo: String,
    status: String,
    hostel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hostel' }
    });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;