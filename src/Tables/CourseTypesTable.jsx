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
      } else {
        console.error('Failed to update course type');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Course Types</h4></div>
        </div>

        <section style={{ width: '100%' }}>
          <input type="text" id="search2" className="form-control" placeholder="Search Course Types" />

          <div className="row" style={{ width: '100%' }}>
            <div className="col-md-4"><b>Course Type Number</b></div>
            <div className="col-md-4"><b>Course Type Description</b></div>
            <div className="col-md-4"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: '100%', marginLeft: '1px' }}>
            {coursetypes.map((coursetype, index) => (
              <div key={index} className="row" style={{ width: '100%' }}>
                <div className="col-md-4">{coursetype.COURSETYPENO}</div>
                <div className="col-md-4">{coursetype.COURSETYPEDESCRIPTION}</div>
                <div className="col-md-4">
                  <button onClick={() => handleUpdate(coursetype)}>Update</button>
                  <button onClick={() => handleDelete(coursetype.COURSETYPENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editCourseType && (
            <form onSubmit={handleFormSubmit} style={{ marginTop: '20px' }}>
              <h3>Edit Course Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label>
                  Course Type Description:
                  <input type="text" name="COURSETYPEDESCRIPTION" value={editCourseType.COURSETYPEDESCRIPTION} onChange={handleFormChange} />
                </label>
                <button type="submit" style={{ alignSelf: 'flex-start' }}>Update</button>
                <button type="button" onClick={() => setEditCourseType(null)} style={{ alignSelf: 'flex-start' }}>Cancel</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
