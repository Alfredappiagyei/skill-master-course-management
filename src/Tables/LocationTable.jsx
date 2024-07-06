import React, { useState, useEffect } from 'react';

export default function LocationTable() {

  const [locations, setLocations] = useState([]);

  const handleViewLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locations');
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    handleViewLocations();
  }, []);
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Locations</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-4"><b>Location Number</b></div>
          <div className="col-md-4" ><b>Location Name</b></div>
          <div className="col-md-4" ><b>Location Maximum Size</b></div>

        
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {locations.map((location, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-6">{location.LOCATIONNO}</div>
                <div className="col-md-6">{location.LOCATIONNAME}</div>
                <div className="col-md-6">{location.LOCATIONMAXSIZE}</div>

              </div>
            ))}
          </div>

      </section>
    </div>
  </div>
  )
}
