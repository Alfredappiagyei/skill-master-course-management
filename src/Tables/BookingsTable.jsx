import React, { useState, useEffect } from 'react';

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

  // Delete booking by bookingNo
  const handleDelete = async (bookingNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${bookingNo}`, { method: 'DELETE' });
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.BOOKINGNO !== bookingNo));
        console.log('Booking deleted successfully');
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
      console.log('Updating booking:', editBooking); // Check if editBooking has the updated values

      const response = await fetch(`http://localhost:3001/api/bookings/${editBooking.BOOKINGNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBooking),
      });

      if (response.ok) {
        const updatedBooking = await response.json(); // Assuming the API returns the updated booking
        console.log('Booking updated successfully:', updatedBooking); // Log updated booking details

        // Update the bookings state to reflect the changes
        setBookings(bookings.map((bk) => (bk.BOOKINGNO === updatedBooking.BOOKINGNO ? updatedBooking : bk)));
        setEditBooking(null); // Reset editBooking state after successful update
      } else {
        console.error('Failed to update booking');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Bookings</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-2"><b>Booking Number</b></div>
            <div className="col-md-4"><b>Booking Date</b></div>
            <div className="col-md-2"><b>Location Number</b></div>
            <div className="col-md-2"><b>Course Number</b></div>
            <div className="col-md-2"><b>Employee Number</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {bookings.map((booking, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-2">{booking.BOOKINGNO}</div>
                <div className="col-md-4">{booking.BOOKINGDATE}</div>
                <div className="col-md-2">{booking.LOCATIONNO}</div>
                <div className="col-md-2">{booking.COURSENO}</div>
                <div className="col-md-2">{booking.BOOKINGEMPLOYEENO}</div>
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(booking)}>Update</button>
                  <button onClick={() => handleDelete(booking.BOOKINGNO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editBooking && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Booking</h3>
              <label>
                Booking Date:
                <input type="text" name="BOOKINGDATE" value={editBooking.BOOKINGDATE} onChange={handleFormChange} />
              </label>
              <label>
                Location Number:
                <input type="text" name="LOCATIONNO" value={editBooking.LOCATIONNO} onChange={handleFormChange} />
              </label>
              <label>
                Course Number:
                <input type="text" name="COURSENO" value={editBooking.COURSENO} onChange={handleFormChange} />
              </label>
              <label>
                Employee Number:
                <input type="text" name="BOOKINGEMPLOYEENO" value={editBooking.BOOKINGEMPLOYEENO} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditBooking(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
