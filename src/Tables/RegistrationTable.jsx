import React, { useState, useEffect } from 'react';

export default function RegistrationTable() {
  const [registrations, setRegistrations] = useState([]);

  const handleViewRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/registrations');
      const data = await response.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  useEffect(() => {
    handleViewRegistrations();
  }, []);

  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Registrations</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-2"><b>Registration  Number</b></div>
          <div className="col-md-2" ><b>Registration Date</b></div>
          <div className="col-md-2" ><b>Delegate Number</b></div>
          <div className="col-md-2" ><b>Course Fee Number</b></div>
          <div className="col-md-2" ><b>Employee Number</b></div>
          <div className="col-md-2" ><b>Course Number</b></div>

        
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {registrations.map((registration, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-2">{registration.REGISTRATIONNO}</div>
                <div className="col-md-2">{registration.REGISTRATIONDATE}</div>
                <div className="col-md-2">{registration.DELEGATENO}</div>
                <div className="col-md-2">{registration.COURSEFEENO}</div>
                <div className="col-md-2">{registration.REGISTEREMPLOYEENO}</div>
                <div className="col-md-2">{registration.COURSENO}</div>
              </div>
            ))}
          </div>
      </section>
    </div>
  </div>
  )
}
