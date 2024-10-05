import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get room ID from URL
import '../styles/RoomData.css';
import axios from 'axios';

const rooms = [
  { id: 1, number: '101', type: 'Single', occupied: false },
  { id: 2, number: '102', type: 'Double', occupied: true },
  { id: 3, number: '103', type: 'Single', occupied: true },
  { id: 4, number: '104', type: 'Single', occupied: true },
  { id: 5, number: '105', type: 'Single', occupied: false },
  { id: 6, number: '106', type: 'Single', occupied: true },
  { id: 7, number: '107', type: 'Single', occupied: true },
  { id: 8, number: '108', type: 'Single', occupied: true },
  { id: 9, number: '109', type: 'Single', occupied: true },
  { id: 10, number: '110', type: 'Single', occupied: false },
  { id: 11, number: '111', type: 'Single', occupied: true },
  { id: 12, number: '112', type: 'Single', occupied: true },
  { id: 13, number: '113', type: 'Single', occupied: true },
  { id: 14, number: '114', type: 'Single', occupied: true },
  { id: 15, number: '115', type: 'Single', occupied: false },
  { id: 16, number: '116', type: 'Single', occupied: true },
  { id: 17, number: '117', type: 'Single', occupied: true },
  { id: 18, number: '118', type: 'Single', occupied: true },
  { id: 19, number: '119', type: 'Single', occupied: true },
  { id: 20, number: '120', type: 'Single', occupied: false },
  { id: 21, number: '121', type: 'Single', occupied: true },
  { id: 22, number: '122', type: 'Single', occupied: true },
  { id: 23, number: '123', type: 'Single', occupied: true },
  { id: 24, number: '124', type: 'Single', occupied: true },
  { id: 25, number: '125', type: 'Single', occupied: false },
  { id: 26, number: '126', type: 'Single', occupied: true },
  { id: 27, number: '127', type: 'Single', occupied: true },
  { id: 28, number: '128', type: 'Single', occupied: true },
  { id: 29, number: '129', type: 'Single', occupied: true },
  { id: 30, number: '130', type: 'Single', occupied: false },
  { id: 31, number: '131', type: 'Single', occupied: true },
  { id: 32, number: '132', type: 'Single', occupied: true },
  { id: 33, number: '133', type: 'Single', occupied: true },
  { id: 34, number: '134', type: 'Single', occupied: true },
  { id: 35, number: '135', type: 'Single', occupied: false },
  { id: 36, number: '136', type: 'Single', occupied: true },
  { id: 37, number: '137', type: 'Single', occupied: true },
  { id: 38, number: '138', type: 'Single', occupied: true },
  { id: 39, number: '139', type: 'Single', occupied: true },
  { id: 40, number: '140', type: 'Single', occupied: false },
  { id: 41, number: '141', type: 'Single', occupied: true },
  { id: 42, number: '142', type: 'Single', occupied: true },
  { id: 43, number: '143', type: 'Single', occupied: true },
  { id: 44, number: '144', type: 'Single', occupied: true },
  { id: 45, number: '145', type: 'Single', occupied: false },
  { id: 46, number: '146', type: 'Single', occupied: true },
  { id: 47, number: '147', type: 'Single', occupied: true },
  { id: 48, number: '148', type: 'Single', occupied: true },
  { id: 49, number: '149', type: 'Single', occupied: true },
  { id: 50, number: '150', type: 'Single', occupied: false },
  { id: 51, number: '151', type: 'Single', occupied: true },
  { id: 52, number: '152', type: 'Single', occupied: true },
  { id: 53, number: '153', type: 'Single', occupied: true },
  { id: 54, number: '154', type: 'Single', occupied: true },
  { id: 55, number: '155', type: 'Single', occupied: false },
  { id: 56, number: '156', type: 'Single', occupied: true },
  { id: 57, number: '157', type: 'Single', occupied: true },
  { id: 58, number: '158', type: 'Single', occupied: true },
  { id: 59, number: '159', type: 'Single', occupied: true },
  { id: 60, number: '160', type: 'Single', occupied: false },
  { id: 61, number: '161', type: 'Single', occupied: true },
  { id: 62, number: '162', type: 'Single', occupied: true },
  { id: 63, number: '163', type: 'Single', occupied: true },
  { id: 64, number: '164', type: 'Single', occupied: true },
  { id: 65, number: '165', type: 'Single', occupied: false },
  { id: 66, number: '166', type: 'Single', occupied: true },
  { id: 67, number: '167', type: 'Single', occupied: true },
  { id: 68, number: '168', type: 'Single', occupied: true },
  { id: 69, number: '169', type: 'Single', occupied: true },
  { id: 70, number: '170', type: 'Single', occupied: false },
  { id: 71, number: '171', type: 'Single', occupied: true },
  { id: 72, number: '172', type: 'Single', occupied: true },
  { id: 73, number: '173', type: 'Single', occupied: true },
  { id: 74, number: '174', type: 'Single', occupied: true },
  { id: 75, number: '175', type: 'Single', occupied: false },
  { id: 76, number: '176', type: 'Single', occupied: true },
  { id: 77, number: '177', type: 'Single', occupied: true },
  { id: 78, number: '178', type: 'Single', occupied: true },
  { id: 79, number: '179', type: 'Single', occupied: true },
  { id: 80, number: '180', type: 'Single', occupied: false },
  { id: 81, number: '181', type: 'Single', occupied: false },
  { id: 82, number: '182', type: 'Single', occupied: false },
  { id: 83, number: '183', type: 'Single', occupied: false },
  // Add more rooms here
];

const RoomData = () => {
  const { roomId } = useParams(); // Get roomId from URL
  const room = rooms.find((room) => room.id === parseInt(roomId)); // Find room by ID

  if (!room) {
    return <p>Room not found</p>;
  }

  return (
    <div>
      <h2>Room Details for Room {room.number}</h2>
      <p>Type: {room.type}</p>
      <p>Status: {room.occupied ? 'Occupied' : 'Available'}</p>
      {room.occupied ? (
        <button onClick={() => console.log(`Deallocating room: ${room.id}`)}>Deallocate</button>
      ) : (
        <button onClick={() => console.log(`Allocating room: ${room.id}`)}>Allocate</button>
      )}
    </div>
  );
};

export default RoomData;
