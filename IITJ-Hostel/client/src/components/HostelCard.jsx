import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HostelCard.css';
const HostelCard = ({ hostel }) => {
  return (
    <div className="hostel-card">
      <img src={hostel.image} alt={hostel.name} />
      <h3>{hostel.name}</h3>
      <p>Rooms: {hostel.totalRooms}</p>
      <p>Available: {hostel.availableRooms}</p>
      <Link to={`/hostels/${hostel.id}`}>View Rooms</Link>
    </div>
  );
};

export default HostelCard;
