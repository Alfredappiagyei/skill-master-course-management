import React, { useState, useEffect } from 'react';

export default function BookingTable() {
  const [bookings, setBookings] = useState([]);

  const handleViewBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    handleViewBookings();
  }, []);
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Bookings</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />

        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-2"><b>Booking  Number</b></div>
          <div className="col-md-4" ><b>Booking Date</b></div>
          <div className="col-md-2" ><b>Location Number</b></div>
          <div className="col-md-2" ><b>Course Number</b></div>
          <div className="col-md-2" ><b>Employee Number</b></div>

        
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {bookings.map((booking, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-1">{booking.BOOKINGNO}</div>
                <div className="col-md-1">{booking.BOOKINGDATE}</div>
                <div className="col-md-1">{booking.LOCATIONNO}</div>
                <div className="col-md-3">{booking.COURSENO}</div>
                <div className="col-md-3">{booking.BOOKINGEMPLOYEENO}</div>



              </div>
            ))}
          </div>


      </section>
    </div>
  </div>
  )
}
