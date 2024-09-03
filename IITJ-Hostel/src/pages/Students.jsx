import React from 'react';
import StudentList from '../components/StudentList';

const students = [
  { id: 1, name: 'John Doe', room: '101' },
  { id: 2, name: 'Jane Smith', room: '102' },
  // Add more students here
];

const Students = () => {
  return (
    <div>
      <h2>Students</h2>
      <StudentList students={students} />
    </div>
  );
};

export default Students;
