import React, { useState, useEffect } from 'react';

export default function LocationTable() {
  const [locations, setLocations] = useState([]);
  const [editLocation, setEditLocation] = useState(null);

  // Fetch locations from API
  const handleViewLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locations');
      const data = await response.json();
      setLocations(data);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  // Initial fetch of locations on component mount
  useEffect(() => {
    handleViewLocations();
  }, []);

  // Delete location by locationNo
  const handleDelete = async (locationNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${locationNo}`, { method: 'DELETE' });
      if (response.ok) {
        setLocations(locations.filter((location) => location.LOCATIONNO !== locationNo));
        console.log('Location deleted successfully');
      } else {
        console.error('Failed to delete location');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update location state when editing
  const handleUpdate = (location) => {
    setEditLocation(location);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditLocation({ ...editLocation, [name]: value });
  };

  // Submit updated location data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${editLocation.LOCATIONNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editLocation),
      });

      if (response.ok) {
        const updatedLocation = await response.json();
        setLocations(
          locations.map((loc) =>
            loc.LOCATIONNO === updatedLocation.LOCATIONNO ? updatedLocation : loc
          )
        );
        setEditLocation(null); // Reset editLocation state after successful update
      } else {
        console.error('Failed to update location');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all">
          <h4>All Locations</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Location Number</th>
              <th>Location Name</th>
              <th>Location Maximum Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.LOCATIONNO}</td>
                <td>{location.LOCATIONNAME}</td>
                <td>{location.LOCATIONMAXSIZE}</td>
                <td>
                  <button onClick={() => handleUpdate(location)}>Update</button>
                  <button onClick={() => handleDelete(location.LOCATIONNO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editLocation && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Location</h3>
            <label>
              Location Name:
              <input
                type="text"
                name="LOCATIONNAME"
                value={editLocation.LOCATIONNAME}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Location Maximum Size:
              <input
                type="text"
                name="LOCATIONMAXSIZE"
                value={editLocation.LOCATIONMAXSIZE}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditLocation(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
