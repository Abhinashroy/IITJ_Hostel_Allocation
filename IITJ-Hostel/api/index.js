const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Room = require('./models/RoomData.js');
const Hostel = require('./models/Hostel');
// const Place = require('./models/Place.js');
// const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
// const imageDownloader = require('image-downloader');
// const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
// const multer = require('multer');
// const fs = require('fs');
// const mime = require('mime-types');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
// // // const bucket = 'dawid-booking-app';

app.use(express.json());
app.use(cookieParser());
// // app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL);
app.get('/test', (req,res) => {
  res.json('test ok');
});

app.post('/register', async (req,res) => {
  const {name,email,password} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } 
  catch (e) {
    res.status(422).json(e);
  }

});


app.post('/login', async (req,res) => {
//   mongoose.connect(process.env.MONGO_URL);
  const {email,password} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        // res.json('pass ok');
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('pass not ok');
    }
  }else {
    res.json('not found');
  }
});


app.get('/profile', (req,res) => {
  // mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
  
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});

app.get('/hostels', async (req, res) => {
  try {
    const hostels = await Hostel.find();
    console.log('Hostels found:', hostels);
    
    // Add a test hostel if none are found
    if (hostels.length === 0) {
      const testHostel = {
        name: "Test Hostel",
        totalRooms: 50,
        availableRooms: 20,
        image: "https://example.com/test-image.jpg"
      };
      hostels.push(testHostel);
    }
    
    res.json(hostels);
  } catch (error) {
    console.error('Error fetching hostels:', error);
    res.status(500).json({ error: 'An error occurred while fetching hostels' });
  }
});

// Get all rooms for a hostel
app.get('/hostels/:hostelId/rooms', async (req, res) => {
  const hostelId = req.params.hostelId;
  try {
    console.log('Fetching rooms for hostel:', hostelId);
    
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      console.log('Hostel not found');
      return res.status(404).json({ error: 'Hostel not found' });
    }
    console.log('Found hostel:', hostel);
    
    const rooms = await Room.find({ hostel: hostelId });
    console.log('Found rooms:', rooms);
    
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'An error occurred while fetching rooms' });
  }
});

// Get a specific room
app.get('/rooms/:hostelId/:roomId', async (req, res) => {
  const { hostelId, roomId } = req.params;
  try {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    const db = mongoose.connection.useDb('rooms');
    const HostelRooms = db.model('Room', Room.schema);
    
    const room = await HostelRooms.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the room' });
  }
});

// Add this route if it's missing
app.get('/hostels/:id', async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    res.json(hostel);
  } catch (error) {
    console.error('Error fetching hostel:', error);
    res.status(500).json({ error: 'An error occurred while fetching the hostel' });
  }
});

// Update this route to match the frontend URL pattern
app.get('/hostels/:hostelId/room/:roomId', async (req, res) => {
  const { hostelId, roomId } = req.params;
  try {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }
    
    // Use the main database connection since rooms are in 'test' database
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'An error occurred while fetching the room' });
  }
});

// Add this new route for room allocation
app.post('/hostels/:hostelId/room/:roomId/allocate', async (req, res) => {
  const { hostelId, roomId } = req.params;
  const { name, rollNo } = req.body;
  
  try {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.status === 'occupied') {
      return res.status(400).json({ error: 'Room is already occupied' });
    }

    // Update room details
    room.name = name;
    room.rollNo = rollNo;
    room.status = 'occupied';
    await room.save();

    // Update hostel's available rooms count
    hostel.availableRooms = Math.max(0, hostel.availableRooms - 1);
    await hostel.save();

    res.json(room);
  } catch (error) {
    console.error('Error allocating room:', error);
    res.status(500).json({ error: 'An error occurred while allocating the room' });
  }
});

// Add this new route for room deallocation
app.post('/hostels/:hostelId/room/:roomId/deallocate', async (req, res) => {
  const { hostelId, roomId } = req.params;
  
  try {
    const hostel = await Hostel.findById(hostelId);
    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (room.status !== 'occupied') {
      return res.status(400).json({ error: 'Room is not occupied' });
    }

    // Update room details
    room.name = '';
    room.rollNo = '';
    room.status = 'available';
    await room.save();

    // Update hostel's available rooms count
    hostel.availableRooms = Math.min(hostel.totalRooms, hostel.availableRooms + 1);
    await hostel.save();

    res.json(room);
  } catch (error) {
    console.error('Error deallocating room:', error);
    res.status(500).json({ error: 'An error occurred while deallocating the room' });
  }
});

// Get all occupied rooms with student details
app.get('/rooms/occupied', async (req, res) => {
  try {
    const occupiedRooms = await Room.find({ status: 'occupied' })
      .populate('hostel', 'name'); // This will get the hostel name
    
    // Transform the data to include hostel name
    const students = occupiedRooms.map(room => ({
      _id: room._id,
      name: room.name,
      rollNo: room.rollNo,
      roomNo: room.roomNo,
      hostel: room.hostel._id,
      hostelName: room.hostel.name
    }));
    
    res.json(students);
  } catch (error) {
    console.error('Error fetching occupied rooms:', error);
    res.status(500).json({ error: 'An error occurred while fetching occupied rooms' });
  }
});

app.listen(4000);

