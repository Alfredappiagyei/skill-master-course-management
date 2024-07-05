import React, { useState, useEffect } from 'react';

export default function CourseTable() {
  const [courses, setCourses] = useState([]);

  const handleViewCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    handleViewCourses();
  }, []);

  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Courses</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-1"><b>Course Number</b></div>
          <div className="col-md-1" ><b>Course Name</b></div>
          <div className="col-md-2"><b>Course Description</b></div>
          <div className="col-md-1"> <b>Start Date</b></div>
          <div className="col-md-1"> <b>Start Time</b></div>
          <div className="col-md-1"><b>End Date</b></div>
          <div className="col-md-1"><b>End Time</b></div>
          <div className="col-md-1"><b>Maximum Delegates</b></div>
          <div className="col-md-1"><b>Confirmed</b></div>
          <div className="col-md-1"><b>Employee Number</b></div>
          <div className="col-md-1"><b>Course Type Number</b></div>
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {courses.map((course, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-1">{course.COURSENO}</div>
                <div className="col-md-1">{course.COURSENAME}</div>
                <div className="col-md-2">{course.COURSEDESCRIPTION}</div>
                <div className="col-md-1">{course.STARTDATE}</div>
                <div className="col-md-1">{course.STARTTIME}</div>
                <div className="col-md-1">{course.ENDDATE}</div>
                <div className="col-md-1">{course.ENDTIME}</div>
                <div className="col-md-1">{course.MAXDELEGATE}</div>
                <div className="col-md-1">{course.CONFIRMED}</div>
                <div className="col-md-1">{course.DELIVEREREMPLOYEENO}</div>
                <div className="col-md-1">{course.COURSETYPENO}</div>
              </div>
            ))}
          </div>

      </section>
    </div>
  </div>
  )
}
