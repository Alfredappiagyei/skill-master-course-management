import React, { useState, useEffect } from 'react';

export default function CourseFeeTable() {
  const [courseFees, setCourseFees] = useState([]);
  const [editCourseFee, setEditCourseFee] = useState(null);

  // Fetch course fees from API
  const handleViewCourseFees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coursefees');
      const data = await response.json();
      setCourseFees(data);
    } catch (err) {
      console.error('Error fetching course fees:', err);
    }
  };

  // Initial fetch of course fees on component mount
  useEffect(() => {
    handleViewCourseFees();
  }, []);

  // Delete course fee by courseFeeNo
  const handleDelete = async (courseFeeNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/coursefees/${courseFeeNo}`, { method: 'DELETE' });
      if (response.ok) {
        setCourseFees(courseFees.filter((courseFee) => courseFee.COURSEFEENO !== courseFeeNo));
        console.log('Course fee deleted successfully');
      } else {
        console.error('Failed to delete course fee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update course fee state when editing
  const handleUpdate = (courseFee) => {
    setEditCourseFee(courseFee);
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
      const response = await fetch(`http://localhost:3001/api/coursefees/${editCourseFee.COURSEFEENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourseFee),
      });

      if (response.ok) {
        const updatedCourseFee = await response.json();
        setCourseFees(courseFees.map((fee) => (fee.COURSEFEENO === updatedCourseFee.COURSEFEENO ? updatedCourseFee : fee)));
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
      <div className="all-startups">
        <div className="all">
          <h4>All Course Fees</h4>
        </div>
      </div>
      <section style={{ width: "100%" }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Course Fee Number</th>
              <th>Course Fee Description</th>
              <th>Fee</th>
              <th>Course Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseFees.map((courseFee, index) => (
              <tr key={index}>
                <td>{courseFee.COURSEFEENO}</td>
                <td>{courseFee.FEEDESCRIPTION}</td>
                <td>{courseFee.FEE}</td>
                <td>{courseFee.COURSENO}</td>
                <td>
                  <button onClick={() => handleUpdate(courseFee)}>Update</button>
                  <button onClick={() => handleDelete(courseFee.COURSEFEENO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}
