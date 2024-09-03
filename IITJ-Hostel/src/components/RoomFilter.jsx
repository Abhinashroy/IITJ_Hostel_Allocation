// src/components/RoomFilter.jsx

import React from 'react';

const RoomFilter = ({ onFilterChange }) => {
  return (
    <div>
      {/* Add filter UI elements here */}
      <button onClick={() => onFilterChange('all')}>Show All</button>
      <button onClick={() => onFilterChange('available')}>Show Available</button>
      <button onClick={() => onFilterChange('occupied')}>Show Occupied</button>
    </div>
  );
};

export default RoomFilter;
