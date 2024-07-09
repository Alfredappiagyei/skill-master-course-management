import React, { useState, useEffect } from 'react';

export default function CourseFeeTable() {
  const [coursefees, setCoursefees] = useState([]);
  const [editCourseFee, setEditCourseFee] = useState(null);

  // Fetch course fees from API
  const handleViewCoursefees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coursefees');
      const data = await response.json();
      setCoursefees(data);
    } catch (err) {
      console.error('Error fetching course fees:', err);
    }
  };

  // Initial fetch of course fees on component mount
  useEffect(() => {
    handleViewCoursefees();
  }, []);

  // Delete course fee by courseFeeNo
  const handleDelete = async (courseFeeNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/coursefees/${courseFeeNo}`, { method: 'DELETE' });
      if (response.ok) {
        setCoursefees(coursefees.filter((coursefee) => coursefee.COURSEFEENO !== courseFeeNo));
        console.log('Course fee deleted successfully');
      } else {
        console.error('Failed to delete course fee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update course fee state when editing
  const handleUpdate = (coursefee) => {
    setEditCourseFee(coursefee);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditCourseFee({ ...editCourseFee, [name]: value });
  };

  // Submit updated course fee data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating course fee:', editCourseFee); // Check if editCourseFee has the updated values

      const response = await fetch(`http://localhost:3001/api/coursefees/${editCourseFee.COURSEFEENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourseFee),
      });

      if (response.ok) {
        const updatedCourseFee = await response.json(); // Assuming the API returns the updated course fee
        console.log('Course fee updated successfully:', updatedCourseFee); // Log updated course fee details

        // Update the coursefees state to reflect the changes
        setCoursefees(coursefees.map((fee) => (fee.COURSEFEENO === updatedCourseFee.COURSEFEENO ? updatedCourseFee : fee)));
        setEditCourseFee(null); // Reset editCourseFee state after successful update
      } else {
        console.error('Failed to update course fee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Course Fees</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-3"><b>Course Fee Number</b></div>
            <div className="col-md-3"><b>Course Fee Description</b></div>
            <div className="col-md-3"><b>Fee</b></div>
            <div className="col-md-3"><b>Course Number</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {coursefees.map((coursefee, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-3">{coursefee.COURSEFEENO}</div>
                <div className="col-md-3">{coursefee.FEEDESCRIPTION}</div>
                <div className="col-md-3">{coursefee.FEE}</div>
                <div className="col-md-3">{coursefee.COURSENO}</div>
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(coursefee)}>Update</button>
                  <button onClick={() => handleDelete(coursefee.COURSEFEENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editCourseFee && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Course Fee</h3>
              <label>
                Course Fee Description:
                <input type="text" name="FEEDESCRIPTION" value={editCourseFee.FEEDESCRIPTION} onChange={handleFormChange} />
              </label>
              <label>
                Fee:
                <input type="text" name="FEE" value={editCourseFee.FEE} onChange={handleFormChange} />
              </label>
              <label>
                Course Number:
                <input type="text" name="COURSENO" value={editCourseFee.COURSENO} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditCourseFee(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
