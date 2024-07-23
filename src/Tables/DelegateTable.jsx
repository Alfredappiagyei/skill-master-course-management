import React, { useState, useEffect } from 'react';

export default function DelegateTable({ onDelete }) {
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
      const response = await fetch(`http://localhost:3001/api/delegates/${editDelegate.DELEGATENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editDelegate),
      });

      if (response.ok) {
        const updatedDelegate = await response.json();
        setDelegates(
          delegates.map((del) =>
            del.DELEGATENO === updatedDelegate.DELEGATENO ? updatedDelegate : del
          )
        );
        setEditDelegate(null);
      } else {
        console.error('Failed to update delegate');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='table'>
      <div className='all-startups'>
        <div className='all'>
          <h4>All Delegates</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Delegate Number</th>
              <th>Title</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Tel No</th>
              <th>Fax No</th>
              <th>Email</th>
              <th>Client Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {delegates.map((delegate, index) => (
              <tr key={index}>
                <td>{delegate.DELEGATENO}</td>
                <td>{delegate.DELEGATETITLE}</td>
                <td>{delegate.DELEGATEFNAME}</td>
                <td>{delegate.DELEGATELNAME}</td>
                <td>{delegate.DELEGATESTREET}</td>
                <td>{delegate.DELEGATECITY}</td>
                <td>{delegate.DELEGATESTATE}</td>
                <td>{delegate.DELEGATEZIPCODE}</td>
                <td>{delegate.ATTTELNO}</td>
                <td>{delegate.ATTFAXNO}</td>
                <td>{delegate.ATTEMAILADDRESS}</td>
                <td>{delegate.CLIENTNO}</td>
                <td>
                  <button onClick={() => handleUpdate(delegate)}>Update</button>
                  <button onClick={() => onDelete(delegate.DELEGATENO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editDelegate && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Delegate</h3>
            <label>
              Title:
              <input
                type='text'
                name='DELEGATETITLE'
                value={editDelegate.DELEGATETITLE}
                onChange={handleFormChange}
              />
            </label>
            <label>
              First Name:
              <input
                type='text'
                name='DELEGATEFNAME'
                value={editDelegate.DELEGATEFNAME}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type='text'
                name='DELEGATELNAME'
                value={editDelegate.DELEGATELNAME}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Street:
              <input
                type='text'
                name='DELEGATESTREET'
                value={editDelegate.DELEGATESTREET}
                onChange={handleFormChange}
              />
            </label>
            <label>
              City:
              <input
                type='text'
                name='DELEGATECITY'
                value={editDelegate.DELEGATECITY}
                onChange={handleFormChange}
              />
            </label>
            <label>
              State:
              <input
                type='text'
                name='DELEGATESTATE'
                value={editDelegate.DELEGATESTATE}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Zip Code:
              <input
                type='text'
                name='DELEGATEZIPCODE'
                value={editDelegate.DELEGATEZIPCODE}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Tel No:
              <input
                type='text'
                name='ATTTELNO'
                value={editDelegate.ATTTELNO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Fax No:
              <input
                type='text'
                name='ATTFAXNO'
                value={editDelegate.ATTFAXNO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                name='ATTEMAILADDRESS'
                value={editDelegate.ATTEMAILADDRESS}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Client Number:
              <input
                type='text'
                name='CLIENTNO'
                value={editDelegate.CLIENTNO}
                onChange={handleFormChange}
              />
            </label>
            <button type='submit'>Update</button>
            <button type='button' onClick={() => setEditDelegate(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
