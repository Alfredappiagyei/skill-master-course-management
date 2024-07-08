import React, { useState, useEffect } from 'react';

export default function DelegateTable() {
  const [delegates, setDelegates] = useState([]);
  const [editDelegate, setEditDelegate] = useState(null);

  const handleViewDelegates = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/delegates');
      const data = await response.json();
      setDelegates(data);
    } catch (err) {
      console.error('Error fetching delegates:', err);
    }
  };

  useEffect(() => {
    handleViewDelegates();
  }, []);

  const handleDelete = async (delegateNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/delegates/${delegateNo}`, { method: 'DELETE' });
      if (response.ok) {
        setDelegates(delegates.filter((delegate) => delegate.DELEGATENO !== delegateNo));
        console.log('Delegate deleted successfully');
      } else {
        console.error('Failed to delete delegate');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = (delegate) => {
    setEditDelegate(delegate);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditDelegate({ ...editDelegate, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating delegate:', editDelegate); // Check if editDelegate has the updated values
  
      const response = await fetch(`http://localhost:3001/api/delegates/${editDelegate.DELEGATENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDelegate),
      });
  
      if (response.ok) {
        const updatedDelegate = await response.json(); // Assuming the API returns the updated delegate
        console.log('Delegate updated successfully:', updatedDelegate); // Log updated delegate details
  
        // Update the delegates state to reflect the changes
        setDelegates(delegates.map((del) => (del.DELEGATENO === updatedDelegate.DELEGATENO ? updatedDelegate : del)));
        setEditDelegate(null); // Reset editDelegate state after successful update
      } else {
        console.error('Failed to update delegate');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Delegates</h4></div>
        </div>
        <section style={{ width: '100%' }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />
          <div className="row" style={{ width: '100%' }}>
            <div className="col-md-1"><b>Delegate Number</b></div>
            <div className="col-md-1"><b>Title</b></div>
            <div className="col-md-1"><b>First Name</b></div>
            <div className="col-md-1"><b>Last Name</b></div>
            <div className="col-md-1"><b>Street</b></div>
            <div className="col-md-1"><b>City</b></div>
            <div className="col-md-1"><b>State</b></div>
            <div className="col-md-1"><b>Zip Code</b></div>
            <div className="col-md-1"><b>Tel No</b></div>
            <div className="col-md-1"><b>Fax No</b></div>
            <div className="col-md-1"><b>Email</b></div>
            <div className="col-md-1"><b>Client Number</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: '100%', marginLeft: '1px' }}>
            {delegates.map((delegate, index) => (
              <div key={index} className="row" style={{ width: '100%' }}>
                <div className="col-md-1">{delegate.DELEGATENO}</div>
                <div className="col-md-1">{delegate.DELEGATETITLE}</div>
                <div className="col-md-1">{delegate.DELEGATEFNAME}</div>
                <div className="col-md-1">{delegate.DELEGATELNAME}</div>
                <div className="col-md-1">{delegate.DELEGATESTREET}</div>
                <div className="col-md-1">{delegate.DELEGATECITY}</div>
                <div className="col-md-1">{delegate.DELEGATESTATE}</div>
                <div className="col-md-1">{delegate.DELEGATEZIPCODE}</div>
                <div className="col-md-1">{delegate.ATTTELNO}</div>
                <div className="col-md-1">{delegate.ATTFAXNO}</div>
                <div className="col-md-1">{delegate.ATTEMAILADDRESS}</div>
                <div className="col-md-1">{delegate.CLIENTNO}</div>
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(delegate)}>Update</button>
                  <button onClick={() => handleDelete(delegate.DELEGATENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editDelegate && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Delegate</h3>
              <label>
                Title:
                <input type="text" name="DELEGATETITLE" value={editDelegate.DELEGATETITLE} onChange={handleFormChange} />
              </label>
              <label>
                First Name:
                <input type="text" name="DELEGATEFNAME" value={editDelegate.DELEGATEFNAME} onChange={handleFormChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="DELEGATELNAME" value={editDelegate.DELEGATELNAME} onChange={handleFormChange} />
              </label>
              <label>
                Street:
                <input type="text" name="DELEGATESTREET" value={editDelegate.DELEGATESTREET} onChange={handleFormChange} />
              </label>
              <label>
                City:
                <input type="text" name="DELEGATECITY" value={editDelegate.DELEGATECITY} onChange={handleFormChange} />
              </label>
              <label>
                State:
                <input type="text" name="DELEGATESTATE" value={editDelegate.DELEGATESTATE} onChange={handleFormChange} />
              </label>
              <label>
                Zip Code:
                <input type="text" name="DELEGATEZIPCODE" value={editDelegate.DELEGATEZIPCODE} onChange={handleFormChange} />
              </label>
              <label>
                Tel No:
                <input type="text" name="ATTTELNO" value={editDelegate.ATTTELNO} onChange={handleFormChange} />
              </label>
              <label>
                Fax No:
                <input type="text" name="ATTFAXNO" value={editDelegate.ATTFAXNO} onChange={handleFormChange} />
              </label>
              <label>
                Email:
                <input type="email" name="ATTEMAILADDRESS" value={editDelegate.ATTEMAILADDRESS} onChange={handleFormChange} />
              </label>
              <label>
                Client Number:
                <input type="text" name="CLIENTNO" value={editDelegate.CLIENTNO} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditDelegate(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
