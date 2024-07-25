import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (timeString) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(timeString).toLocaleTimeString(undefined, options);
};

export default function CourseTable({ onDelete }) {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

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
      const response = await fetch(`http://localhost:3001/api/courses/${editCourse.COURSENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourse),
      });

      if (response.ok) {
        const updatedCourse = await response.json();
        setCourses(
          courses.map((c) =>
            c.COURSENO === updatedCourse.COURSENO ? updatedCourse : c
          )
        );
        setEditCourse(null);
      } else {
        console.error('Failed to update course');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all">
          <h4>All Courses</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr>
      <th style={{ width: '10%' }}>Course Number</th>
      <th style={{ width: '10%' }}>Course Name</th>
      <th style={{ width: '15%' }}>Course Description</th>
      <th style={{ width: '10%' }}>Start Date</th>
      <th style={{ width: '10%' }}>Start Time</th>
      <th style={{ width: '10%' }}>End Date</th>
      <th style={{ width: '10%' }}>End Time</th>
      <th style={{ width: '10%' }}>Max Delegates</th>
      <th style={{ width: '10%' }}>Employee Number</th>
      <th style={{ width: '15%' }}>Course Type Number</th>
      <th style={{ width: '20%' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {courses.map((course, index) => (
      <tr key={index}>
        <td style={{ width: '10%' }}>{course.COURSENO}</td>
        <td style={{ width: '10%' }}>{course.COURSENAME}</td>
        <td style={{ width: '15%' }}>{course.COURSEDESCRIPTION}</td>
        <td style={{ width: '10%' }}>{formatDate(course.STARTDATE)}</td>
        <td style={{ width: '10%' }}>{formatTime(course.STARTTIME)}</td>
        <td style={{ width: '10%' }}>{formatDate(course.ENDDATE)}</td>
        <td style={{ width: '10%' }}>{formatTime(course.ENDTIME)}</td>
        <td style={{ width: '10%' }}>{course.MAXDELEGATES}</td>
        <td style={{ width: '10%' }}>{course.DELIVEREREMPLOYEENO}</td>
        <td style={{ width: '15%' }}>{course.COURSETYPENO}</td>
        <td style={{ width: '20%' }}>
          <button onClick={() => handleUpdate(course)}>Update</button>
          <button onClick={() => onDelete(course.COURSENO)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

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
                value={formatDate(editCourse.STARTDATE)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Start Time:
              <input
                type="text"
                name="STARTTIME"
                value={formatTime(editCourse.STARTTIME)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="text"
                name="ENDDATE"
                value={formatDate(editCourse.ENDDATE)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              End Time:
              <input
                type="text"
                name="ENDTIME"
                value={formatTime(editCourse.ENDTIME)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Max Delegates:
              <input
                type="text"
                name="MAXDELEGATE"
                value={editCourse.MAXDELEGATES}
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
  );
}
