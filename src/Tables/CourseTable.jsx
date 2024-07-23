import React, { useState, useEffect } from 'react';

export default function CourseTable() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch courses from API
  const handleViewCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  // Initial fetch of courses on component mount
  useEffect(() => {
    handleViewCourses();
  }, []);

  // Delete course by courseNo
  const handleDelete = async (courseNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/courses/${courseNo}`, { method: 'DELETE' });
      if (response.ok) {
        setCourses(courses.filter((course) => course.COURSENO !== courseNo));
        console.log('Course deleted successfully');
      } else {
        console.error('Failed to delete course');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update course state when editing
  const handleUpdate = (course) => {
    setEditCourse(course);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditCourse({ ...editCourse, [name]: value });
  };

  // Submit updated course data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating course:', editCourse); // Check if editCourse has the updated values

      const response = await fetch(`http://localhost:3001/api/courses/${editCourse.COURSENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourse),
      });

      if (response.ok) {
        const updatedCourse = await response.json(); // Assuming the API returns the updated course
        console.log('Course updated successfully:', updatedCourse); // Log updated course details

        // Update the courses state to reflect the changes
        setCourses(courses.map((c) => (c.COURSENO === updatedCourse.COURSENO ? updatedCourse : c)));
        setEditCourse(null); // Reset editCourse state after successful update
      } else {
        console.error('Failed to update course');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.COURSENAME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Courses</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input
            type="text"
            id="search2"
            className="form-control"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-1"><b>Course Number</b></div>
            <div className="col-md-1"><b>Course Name</b></div>
            <div className="col-md-2"><b>Course Description</b></div>
            <div className="col-md-1"><b>Start Date</b></div>
            <div className="col-md-1"><b>Start Time</b></div>
            <div className="col-md-1"><b>End Date</b></div>
            <div className="col-md-1"><b>End Time</b></div>
            <div className="col-md-1"><b>Maximum Delegates</b></div>
            <div className="col-md-1"><b>Confirmed</b></div>
            <div className="col-md-1"><b>Employee Number</b></div>
            <div className="col-md-1"><b>Course Type Number</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {filteredCourses.map((course, index) => (
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
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(course)}>Update</button>
                  <button onClick={() => handleDelete(course.COURSENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editCourse && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Course</h3>
              <label>
                Course Number:
                <input
                  type="text"
                  name="COURSENO"
                  value={editCourse.COURSENO}
                  onChange={handleFormChange}
                  disabled
                />
              </label>
              <label>
                Course Name:
                <input
                  type="text"
                  name="COURSENAME"
                  value={editCourse.COURSENAME}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Course Description:
                <input
                  type="text"
                  name="COURSEDESCRIPTION"
                  value={editCourse.COURSEDESCRIPTION}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Start Date:
                <input
                  type="text"
                  name="STARTDATE"
                  value={editCourse.STARTDATE}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Start Time:
                <input
                  type="text"
                  name="STARTTIME"
                  value={editCourse.STARTTIME}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                End Date:
                <input
                  type="text"
                  name="ENDDATE"
                  value={editCourse.ENDDATE}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                End Time:
                <input
                  type="text"
                  name="ENDTIME"
                  value={editCourse.ENDTIME}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Maximum Delegates:
                <input
                  type="text"
                  name="MAXDELEGATE"
                  value={editCourse.MAXDELEGATE}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Confirmed:
                <input
                  type="text"
                  name="CONFIRMED"
                  value={editCourse.CONFIRMED}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Employee Number:
                <input
                  type="text"
                  name="DELIVEREREMPLOYEENO"
                  value={editCourse.DELIVEREREMPLOYEENO}
                  onChange={handleFormChange}
                />
              </label>
              <label>
                Course Type Number:
                <input
                  type="text"
                  name="COURSETYPENO"
                  value={editCourse.COURSETYPENO}
                  onChange={handleFormChange}
                />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditCourse(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
