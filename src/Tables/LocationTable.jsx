import React, { useState, useEffect } from 'react';

export default function LocationTable() {
  const [locations, setLocations] = useState([]);
  const [editLocation, setEditLocation] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch locations from API
  const handleViewLocations = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/locations');
      if (!response.ok) throw new Error('Failed to fetch locations');
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
    if (window.confirm('Are you sure you want to delete this location?')) {
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

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!editLocation.LOCATIONNAME) errors.LOCATIONNAME = 'Location Name is required';
    if (!editLocation.LOCATIONMAXSIZE) errors.LOCATIONMAXSIZE = 'Location Maximum Size is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit updated location data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.error('Validation errors:', errors);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:3001/api/locations/${editLocation.LOCATIONNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editLocation),
      });

      if (response.ok) {
        const updatedLocation = await response.json(); // Assuming the API returns the updated location
        setLocations(locations.map((loc) => (loc.LOCATIONNO === updatedLocation.LOCATIONNO ? updatedLocation : loc)));
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
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Locations</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Search Locations" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-4"><b>Location Number</b></div>
            <div className="col-md-4"><b>Location Name</b></div>
            <div className="col-md-4"><b>Location Maximum Size</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {locations.map((location, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-4">{location.LOCATIONNO}</div>
                <div className="col-md-4">{location.LOCATIONNAME}</div>
                <div className="col-md-4">{location.LOCATIONMAXSIZE}</div>
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(location)}>Update</button>
                  <button onClick={() => handleDelete(location.LOCATIONNO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>

          {editLocation && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Location</h3>
              <label>
                Location Name:
                <input type="text" name="LOCATIONNAME" value={editLocation.LOCATIONNAME} onChange={handleFormChange} />
                {errors.LOCATIONNAME && <span className="error">{errors.LOCATIONNAME}</span>}
              </label>
              <label>
                Location Maximum Size:
                <input type="text" name="LOCATIONMAXSIZE" value={editLocation.LOCATIONMAXSIZE} onChange={handleFormChange} />
                {errors.LOCATIONMAXSIZE && <span className="error">{errors.LOCATIONMAXSIZE}</span>}
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditLocation(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
