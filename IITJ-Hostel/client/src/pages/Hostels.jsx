import React from 'react';
import HostelCard from '../components/HostelCard';
import '../styles/Hostels.css';
const hostels = [
  { id: 1, name: 'Hostel Rohida', totalRooms: 50, availableRooms: 20, image: '/images/hostel-a.jpg' },
  { id: 2, name: 'Hostel B', totalRooms: 40, availableRooms: 15, image: '/images/hostel-b.jpg' },
  { id: 3, name: 'Hostel C', totalRooms: 60, availableRooms: 25, image: '/images/hostel-c.jpg' },
  { id: 4, name: 'Hostel D', totalRooms: 55, availableRooms: 30, image: '/images/hostel-d.jpg' },
  { id: 5, name: 'Hostel E', totalRooms: 45, availableRooms: 10, image: '/images/hostel-e.jpg' },
  { id: 6, name: 'Hostel F', totalRooms: 65, availableRooms: 40, image: '/images/hostel-f.jpg' },
  // Add more hostels here
];

const Hostels = () => {
  return (
    <div className=''>
      <h2 className='pl-8 p-4 ' >Hostels</h2>
      <div className="hostels-list">
        {hostels.map((hostel) => (
          <HostelCard key={hostel.id} hostel={hostel} />
        ))}
      </div>
    </div>
  );
};

export default Hostels;
