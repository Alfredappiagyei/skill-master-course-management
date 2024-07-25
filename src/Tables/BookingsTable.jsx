import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);

  // Fetch bookings from API
  const handleViewBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  // Initial fetch of bookings on component mount
  useEffect(() => {
    handleViewBookings();
  }, []);

  // Handle delete operation
  const handleDelete = async (bookingNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${bookingNo}`, { method: 'DELETE' });
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.BOOKINGNO !== bookingNo));
      } else {
        console.error('Failed to delete booking');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update booking state when editing
  const handleUpdate = (booking) => {
    setEditBooking(booking);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditBooking({ ...editBooking, [name]: value });
  };

  // Submit updated booking data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${editBooking.BOOKINGNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBooking),
      });

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings(
          bookings.map((bk) =>
            bk.BOOKINGNO === updatedBooking.BOOKINGNO ? updatedBooking : bk
          )
        );
        setEditBooking(null);
      } else {
        console.error('Failed to update booking');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all"><h4>All Bookings</h4></div>
      </div>
      <section style={{ width: "100%" }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Booking Number</th>
              <th>Booking Date</th>
              <th>Location Number</th>
              <th>Course Number</th>
              <th>Employee Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.BOOKINGNO}</td>
                <td>{formatDate(booking.BOOKINGDATE)}</td>
                <td>{booking.LOCATIONNO}</td>
                <td>{booking.COURSENO}</td>
                <td>{booking.BOOKINGEMPLOYEENO}</td>
                <td>
                  <button onClick={() => handleUpdate(booking)}>Update</button>
                  <button onClick={() => handleDelete(booking.BOOKINGNO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editBooking && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Booking</h3>
            <label>
              Booking Number:
              <input
                type="text"
                name="BOOKINGNO"
                value={editBooking.BOOKINGNO}
                onChange={handleFormChange}
                disabled
              />
            </label>
            <label>
              Booking Date:
              <input
                type="text"
                name="BOOKINGDATE"
                value={formatDate(editBooking.BOOKINGDATE)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Location Number:
              <input
                type="text"
                name="LOCATIONNO"
                value={editBooking.LOCATIONNO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Course Number:
              <input
                type="text"
                name="COURSENO"
                value={editBooking.COURSENO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Employee Number:
              <input
                type="text"
                name="BOOKINGEMPLOYEENO"
                value={editBooking.BOOKINGEMPLOYEENO}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditBooking(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
