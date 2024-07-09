import React, { useState, useEffect } from 'react';

export default function RegistrationTable() {
  const [registrations, setRegistrations] = useState([]);
  const [editRegistration, setEditRegistration] = useState(null);

  // Fetch registrations from API
  const handleViewRegistrations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/registrations');
      const data = await response.json();
      setRegistrations(data);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    }
  };

  // Initial fetch of registrations on component mount
  useEffect(() => {
    handleViewRegistrations();
  }, []);

  // Delete registration by registrationNo
  const handleDelete = async (registrationNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/registrations/${registrationNo}`, { method: 'DELETE' });
      if (response.ok) {
        setRegistrations(registrations.filter((registration) => registration.REGISTRATIONNO !== registrationNo));
        console.log('Registration deleted successfully');
      } else {
        console.error('Failed to delete registration');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update registration state when editing
  const handleUpdate = (registration) => {
    setEditRegistration(registration);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditRegistration({ ...editRegistration, [name]: value });
  };

  // Submit updated registration data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating registration:', editRegistration); // Check if editRegistration has the updated values

      const response = await fetch(`http://localhost:3001/api/registrations/${editRegistration.REGISTRATIONNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRegistration),
      });

      if (response.ok) {
        const updatedRegistration = await response.json(); // Assuming the API returns the updated registration
        console.log('Registration updated successfully:', updatedRegistration); // Log updated registration details

        // Update the registrations state to reflect the changes
        setRegistrations(registrations.map((reg) => (reg.REGISTRATIONNO === updatedRegistration.REGISTRATIONNO ? updatedRegistration : reg)));
        setEditRegistration(null); // Reset editRegistration state after successful update
      } else {
        console.error('Failed to update registration');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Registrations</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-2"><b>Registration Number</b></div>
            <div className="col-md-2"><b>Registration Date</b></div>
            <div className="col-md-2"><b>Delegate Number</b></div>
            <div className="col-md-2"><b>Course Fee Number</b></div>
            <div className="col-md-2"><b>Employee Number</b></div>
            <div className="col-md-2"><b>Course Number</b></div>
            <div className="col-md-2"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {registrations.map((registration, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-2">{registration.REGISTRATIONNO}</div>
                <div className="col-md-2">{registration.REGISTRATIONDATE}</div>
                <div className="col-md-2">{registration.DELEGATENO}</div>
                <div className="col-md-2">{registration.COURSEFEENO}</div>
                <div className="col-md-2">{registration.REGISTEREMPLOYEENO}</div>
                <div className="col-md-2">{registration.COURSENO}</div>
                <div className="col-md-2">
                  <button onClick={() => handleUpdate(registration)}>Update</button>
                  <button onClick={() => handleDelete(registration.REGISTRATIONNO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editRegistration && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Registration</h3>
              <label>
                Registration Date:
                <input type="text" name="REGISTRATIONDATE" value={editRegistration.REGISTRATIONDATE} onChange={handleFormChange} />
              </label>
              <label>
                Delegate Number:
                <input type="text" name="DELEGATENO" value={editRegistration.DELEGATENO} onChange={handleFormChange} />
              </label>
              <label>
                Course Fee Number:
                <input type="text" name="COURSEFEENO" value={editRegistration.COURSEFEENO} onChange={handleFormChange} />
              </label>
              <label>
                Employee Number:
                <input type="text" name="REGISTEREMPLOYEENO" value={editRegistration.REGISTEREMPLOYEENO} onChange={handleFormChange} />
              </label>
              <label>
                Course Number:
                <input type="text" name="COURSENO" value={editRegistration.COURSENO} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditRegistration(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
