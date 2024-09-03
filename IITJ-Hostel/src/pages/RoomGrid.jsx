import React, { useState } from 'react';
import RoomCard from '../components/RoomCard';
import RoomFilter from '../components/RoomFilter';

const rooms = [
  { id: 1, number: '101', type: 'Single', occupied: false },
  { id: 2, number: '102', type: 'Double', occupied: true },
  // Add more rooms here
];

const RoomGrid = () => {
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  const handleAllocate = (roomId) => {
    // Handle allocation logic here
    console.log('Allocating room:', roomId);
  };

  const handleDeallocate = (roomId) => {
    // Handle deallocation logic here
    console.log('Deallocating room:', roomId);
  };

  return (
    <div>
      <h2>Rooms in Hostel</h2>
      <RoomFilter rooms={rooms} setFilteredRooms={setFilteredRooms} />
      <div className="rooms-grid">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} onAllocate={handleAllocate} onDeallocate={handleDeallocate} />
        ))}
      </div>
    </div>
  );
};

export default RoomGrid;
