import React, { useState, useEffect } from 'react';

export default function CourseFeeTable() {
  const [coursefees, setCoursefees] = useState([]);

  const handleViewCoursefees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coursefees');
      const data = await response.json();
      setCoursefees(data);
    } catch (err) {
      console.error('Error fetching course fee:', err);
    }
  };

  useEffect(() => {
    handleViewCoursefees();
  }, []);

  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Course Fees</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-3"><b>Course Fee Number</b></div>
          <div className="col-md-3" ><b>Course Fee Description</b></div>
          <div className="col-md-3"><b>Fee</b></div>
          <div className="col-md-3"> <b>Course Number</b></div>
        
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {coursefees.map((coursefee, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-1">{coursefee.COURSEFEENO}</div>
                <div className="col-md-1">{coursefee.FEEDESCRIPTION}</div>
                <div className="col-md-2">{coursefee.FEE}</div>
                <div className="col-md-1">{coursefee.COURSENO}</div>
              </div>
            ))}
          </div>

      </section>
    </div>
  </div>
  )
}
