import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RoomData.css';
import axios from 'axios';

const RoomData = () => {
  const { hostelId, roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Add states for allocation form and deallocation
  const [showAllocationForm, setShowAllocationForm] = useState(false);
  const [showDeallocationConfirm, setShowDeallocationConfirm] = useState(false);
  const [allocationData, setAllocationData] = useState({
    name: '',
    rollNo: ''
  });
  const [allocating, setAllocating] = useState(false);
  const [deallocating, setDeallocating] = useState(false);

  useEffect(() => {
    fetchRoomData();
  }, [hostelId, roomId]);

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(`/hostels/${hostelId}/room/${roomId}`);
      setRoom(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setError('Failed to load room data. Please try again later.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/hostels/${hostelId}`);
  };

  const handleAllocationSubmit = async (e) => {
    e.preventDefault();
    setAllocating(true);
    try {
      await axios.post(`/hostels/${hostelId}/room/${roomId}/allocate`, allocationData);
      await fetchRoomData();
      setShowAllocationForm(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to allocate room');
    } finally {
      setAllocating(false);
    }
  };

  const handleDeallocation = async () => {
    setDeallocating(true);
    try {
      await axios.post(`/hostels/${hostelId}/room/${roomId}/deallocate`);
      await fetchRoomData();
      setShowDeallocationConfirm(false);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to deallocate room');
    } finally {
      setDeallocating(false);
    }
  };

  if (loading) return <div className="room-data-container loading">Loading room data...</div>;
  if (error) return <div className="room-data-container error">{error}</div>;
  if (!room) return <div className="room-data-container">Room not found</div>;

  return (
    <div className="room-data-container">
      <div className="room-data-card">
        <button className="back-button" onClick={handleBack}>← Back to Rooms</button>
        
        <h2>Room {room.roomNo}</h2>
        
        <div className="status-badge" data-status={room.status}>
          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
        </div>

        <div className="room-details">
          {room.status === 'occupied' ? (
            <>
              <div className="detail-group">
                <label>Student Name:</label>
                <span>{room.name}</span>
              </div>
              
              <div className="detail-group">
                <label>Roll Number:</label>
                <span>{room.rollNo}</span>
              </div>

              {showDeallocationConfirm && (
                <div className="confirmation-dialog">
                  <p>Are you sure you want to deallocate this room?</p>
                  <div className="confirmation-buttons">
                    <button 
                      className="cancel-button"
                      onClick={() => setShowDeallocationConfirm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="confirm-button"
                      onClick={handleDeallocation}
                      disabled={deallocating}
                    >
                      {deallocating ? 'Deallocating...' : 'Confirm Deallocation'}
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : showAllocationForm ? (
            <form onSubmit={handleAllocationSubmit} className="allocation-form">
              <div className="form-group">
                <label>Student Name:</label>
                <input
                  type="text"
                  value={allocationData.name}
                  onChange={(e) => setAllocationData({...allocationData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Roll Number:</label>
                <input
                  type="text"
                  value={allocationData.rollNo}
                  onChange={(e) => setAllocationData({...allocationData, rollNo: e.target.value})}
                  required
                />
              </div>

              <div className="form-buttons">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowAllocationForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={allocating}
                >
                  {allocating ? 'Allocating...' : 'Submit'}
                </button>
              </div>
            </form>
          ) : (
            <div className="empty-message">
              This room is currently available for allocation
            </div>
          )}
        </div>

        <div className="action-buttons">
          {room.status === 'occupied' ? (
            <button 
              className="deallocate-button"
              onClick={() => setShowDeallocationConfirm(true)}
              disabled={showDeallocationConfirm || deallocating}
            >
              {deallocating ? 'Deallocating...' : 'Deallocate Room'}
            </button>
          ) : !showAllocationForm && (
            <button 
              className="allocate-button"
              onClick={() => setShowAllocationForm(true)}
            >
              Allocate Room
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomData;