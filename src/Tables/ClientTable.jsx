import React, { useState, useEffect } from 'react';

export default function ClientTable() {
  const [clients, setClients] = useState([]);
  const [editClient, setEditClient] = useState(null);

  const handleViewClients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const handleDelete = async (clientNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/clients/${clientNo}`, { method: 'DELETE' });
      if (response.ok) {
        setClients(clients.filter((client) => client.CLIENTNO !== clientNo));
        console.log('Client deleted successfully');
      } else {
        console.error('Failed to delete client');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = (client) => {
    setEditClient(client);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditClient({ ...editClient, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/clients/${editClient.CLIENTNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editClient),
      });

      if (response.ok) {
        const updatedClient = await response.json();
        setClients(clients.map((client) => (client.CLIENTNO === updatedClient.CLIENTNO ? updatedClient : client)));
        setEditClient(null);
        console.log('Client updated successfully:', updatedClient);
      } else {
        console.error('Failed to update client');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    handleViewClients();
  }, []);

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Clients</h4></div>
        </div>
        <section style={{ width: '100%' }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />
          <div className="row" style={{ width: '100%' }}>
            <div className="col-md-2" style={{ paddingRight: '100px' }}><b>Client Number</b></div>
            <div className="col-md-2"><b>Client Name</b></div>
            <div className="col-md-2"><b>Client Email</b></div>
            <div className="col-md-2"><b>Client Contact</b></div>
            <div className="col-md-2"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: '100%', marginLeft: '1px' }}>
            {clients.map((client, index) => (
              <div key={index} className="row" style={{ width: '100%' }}>
                <div className="col-md-2">{client.CLIENTNO}</div>
                <div className="col-md-2">{client.CLIENTNAME}</div>
                <div className="col-md-2">{client.CLIENTEMAIL}</div>
                <div className="col-md-2">{client.CLIENTCONTACT}</div>
                <div className="col-md-2">
                  <button onClick={() => handleUpdate(client)}>Update</button>
                  <button onClick={() => handleDelete(client.CLIENTNO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editClient && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Client</h3>
              <label>
                Name:
                <input type="text" name="CLIENTNAME" value={editClient.CLIENTNAME} onChange={handleFormChange} />
              </label>
              <label>
                Email:
                <input type="email" name="CLIENTEMAIL" value={editClient.CLIENTEMAIL} onChange={handleFormChange} />
              </label>
              <label>
                Contact:
                <input type="text" name="CLIENTCONTACT" value={editClient.CLIENTCONTACT} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditClient(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
