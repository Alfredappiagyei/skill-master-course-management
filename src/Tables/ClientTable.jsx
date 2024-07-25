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
      <div className="all-startups">
        <div className="all">
          <h4>All Clients</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Client Number</th>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Client Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={index}>
                <td>{client.CLIENTNO}</td>
                <td>{client.CLIENTNAME}</td>
                <td>{client.CLIENTEMAIL}</td>
                <td>{client.CLIENTCONTACT}</td>
                <td>
                  <button onClick={() => handleUpdate(client)}>Update</button>
                  <button onClick={() => handleDelete(client.CLIENTNO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editClient && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Client</h3>
            <label>
              Name:
              <input
                type="text"
                name="CLIENTNAME"
                value={editClient.CLIENTNAME}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="CLIENTEMAIL"
                value={editClient.CLIENTEMAIL}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                name="CLIENTCONTACT"
                value={editClient.CLIENTCONTACT}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditClient(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
