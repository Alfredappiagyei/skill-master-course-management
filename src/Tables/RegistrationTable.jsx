import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function RegistrationTable({ onDelete }) {
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
      const response = await fetch(`http://localhost:3001/api/registrations/${editRegistration.REGISTRATIONNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRegistration),
      });

      if (response.ok) {
        const updatedRegistration = await response.json();
        setRegistrations(
          registrations.map((reg) =>
            reg.REGISTRATIONNO === updatedRegistration.REGISTRATIONNO ? updatedRegistration : reg
          )
        );
        setEditRegistration(null);
      } else {
        console.error('Failed to update registration');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all">
          <h4>All Registrations</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Registration Date</th>
              <th>Delegate Number</th>
              <th>Course Fee Number</th>
              <th>Employee Number</th>
              <th>Course Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr key={index}>
                <td>{registration.REGISTRATIONNO}</td>
                <td>{formatDate(registration.REGISTRATIONDATE)}</td>
                <td>{registration.DELEGATENO}</td>
                <td>{registration.COURSEFEENO}</td>
                <td>{registration.REGISTEREMPLOYEENO}</td>
                <td>{registration.COURSENO}</td>
                <td>
                  <button onClick={() => handleUpdate(registration)}>Update</button>
                  <button onClick={() => handleDelete(registration.REGISTRATIONNO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editRegistration && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Registration</h3>
            <label>
              Registration Number:
              <input
                type="text"
                name="REGISTRATIONNO"
                value={editRegistration.REGISTRATIONNO}
                onChange={handleFormChange}
                disabled
              />
            </label>
            <label>
              Registration Date:
              <input
                type="text"
                name="REGISTRATIONDATE"
                value={formatDate(editRegistration.REGISTRATIONDATE)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Delegate Number:
              <input
                type="text"
                name="DELEGATENO"
                value={editRegistration.DELEGATENO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Course Fee Number:
              <input
                type="text"
                name="COURSEFEENO"
                value={editRegistration.COURSEFEENO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Employee Number:
              <input
                type="text"
                name="REGISTEREMPLOYEENO"
                value={editRegistration.REGISTEREMPLOYEENO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Course Number:
              <input
                type="text"
                name="COURSENO"
                value={editRegistration.COURSENO}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditRegistration(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
