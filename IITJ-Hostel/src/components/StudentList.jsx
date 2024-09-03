
// src/components/StudentList.jsx
import React from 'react';

const StudentList = ({ students }) => {
  return (
    <div>
      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - Room: {student.room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
