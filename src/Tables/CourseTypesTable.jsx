import React, { useState, useEffect } from 'react';

export default function CourseTypesTable() {
  const [coursetypes, setCoursetypes] = useState([]);
  const [editCourseType, setEditCourseType] = useState(null);

  const handleViewCoursetypes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/coursetypes');
      const data = await response.json();
      setCoursetypes(data);
    } catch (err) {
      console.error('Error fetching course types:', err);
    }
  };

  useEffect(() => {
    handleViewCoursetypes();
  }, []);

  const handleDelete = async (courseTypeNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/coursetypes/${courseTypeNo}`, { method: 'DELETE' });
      if (response.ok) {
        setCoursetypes(coursetypes.filter((coursetype) => coursetype.COURSETYPENO !== courseTypeNo));
        console.log('Course type deleted successfully');
      } else {
        console.error('Failed to delete course type');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = (coursetype) => {
    setEditCourseType(coursetype);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditCourseType({ ...editCourseType, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/coursetypes/${editCourseType.COURSETYPENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editCourseType),
      });

      if (response.ok) {
        const updatedCourseType = await response.json();
        setCoursetypes(coursetypes.map((ct) => (ct.COURSETYPENO === updatedCourseType.COURSETYPENO ? updatedCourseType : ct)));
        setEditCourseType(null);
        console.log('Course type updated successfully:', updatedCourseType);
      } else {
        console.error('Failed to update course type');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all"><h4>All Course Types</h4></div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Course Type Number</th>
              <th>Course Type Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursetypes.map((coursetype) => (
              <tr key={coursetype.COURSETYPENO}>
                <td>{coursetype.COURSETYPENO}</td>
                <td>{coursetype.COURSETYPEDESCRIPTION}</td>
                <td>
                  <button onClick={() => handleUpdate(coursetype)}>Update</button>
                  <button onClick={() => handleDelete(coursetype.COURSETYPENO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editCourseType && (
          <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
            <h3>Edit Course Type</h3>
            <label>
              Course Type Description:
              <input type="text" name="COURSETYPEDESCRIPTION" value={editCourseType.COURSETYPEDESCRIPTION} onChange={handleFormChange} />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditCourseType(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
