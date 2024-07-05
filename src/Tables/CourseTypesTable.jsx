import React, { useState, useEffect } from 'react';

export default function CourseTypesTable() {
  const [coursetypes, setCoursetypes] = useState([]);

  const handleViewCoursetypes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coursetypes');
      const data = await response.json();
      setCoursetypes(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    handleViewCoursetypes();
  }, []);



  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Course Types</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6"><b>Course Type Number</b></div>
          <div className="col-md-6"> <b>Course Type Description</b></div>
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {coursetypes.map((coursetype, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-6">{coursetype.COURSETYPENO}</div>
                <div className="col-md-6">{coursetype.COURSETYPEDESCRIPTION}</div>
              </div>
            ))}
          </div>


      </section>
    </div>
  </div>
  )
}
