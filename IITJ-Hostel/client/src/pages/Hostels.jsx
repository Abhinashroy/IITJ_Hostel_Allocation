import React from 'react';
import HostelCard from '../components/HostelCard';

const hostels = [
  { id: 1, name: 'Hostel A', totalRooms: 50, availableRooms: 20, image: '/images/hostel-a.jpg' },
  { id: 2, name: 'Hostel B', totalRooms: 40, availableRooms: 15, image: '/images/hostel-b.jpg' },
  // Add more hostels here
];

const Hostels = () => {
  return (
    <div>
      <h2>Available Hostels</h2>
      <div className="hostels-list">
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
};

export default Hostels;
