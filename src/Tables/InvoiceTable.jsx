import React, { useState, useEffect } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);
  const [editInvoice, setEditInvoice] = useState(null);

  // Fetch invoices from API
  const handleViewInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    }
  };

  // Initial fetch of invoices on component mount
  useEffect(() => {
    handleViewInvoices();
  }, []);

  // Handle delete operation
  const handleDelete = async (invoiceNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/invoices/${invoiceNo}`, { method: 'DELETE' });
      if (response.ok) {
        setInvoices(invoices.filter((invoice) => invoice.INVOICENO !== invoiceNo));
      } else {
        console.error('Failed to delete invoice');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  // Update invoice state when editing
  const handleUpdate = (invoice) => {
    setEditInvoice(invoice);
  };

  // Handle changes in the edit form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditInvoice({ ...editInvoice, [name]: value });
  };

  // Submit updated invoice data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/invoices/${editInvoice.INVOICENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editInvoice),
      });

      if (response.ok) {
        const updatedInvoice = await response.json();
        setInvoices(
          invoices.map((inv) =>
            inv.INVOICENO === updatedInvoice.INVOICENO ? updatedInvoice : inv
          )
        );
        setEditInvoice(null);
      } else {
        console.error('Failed to update invoice');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all"><h4>All Invoices</h4></div>
      </div>
      <section style={{ width: "100%" }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date Raised</th>
              <th>Date Paid</th>
              <th>Credit Card Number</th>
              <th>Holders Name</th>
              <th>Expiry Date</th>
              <th>Registration Number</th>
              <th>Payment Method Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.INVOICENO}</td>
                <td>{formatDate(invoice.DATERAISED)}</td>
                <td>{formatDate(invoice.DATEPAID)}</td>
                <td>{invoice.CREDITCARDNO}</td>
                <td>{invoice.HOLDERSNAME}</td>
                <td>{formatDate(invoice.EXPIRYDATE)}</td>
                <td>{invoice.REGISTRATIONNO}</td>
                <td>{invoice.PMETHODNO}</td>
                <td>
                  <button onClick={() => handleUpdate(invoice)}>Update</button>
                  <button onClick={() => handleDelete(invoice.INVOICENO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editInvoice && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Invoice</h3>
            <label>
              Invoice Number:
              <input
                type="text"
                name="INVOICENO"
                value={editInvoice.INVOICENO}
                onChange={handleFormChange}
                disabled
              />
            </label>
            <label>
              Date Raised:
              <input
                type="text"
                name="DATERAISED"
                value={formatDate(editInvoice.DATERAISED)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Date Paid:
              <input
                type="text"
                name="DATEPAID"
                value={formatDate(editInvoice.DATEPAID)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Credit Card Number:
              <input
                type="text"
                name="CREDITCARDNO"
                value={editInvoice.CREDITCARDNO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Holder's Name:
              <input
                type="text"
                name="HOLDERSNAME"
                value={editInvoice.HOLDERSNAME}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Expiry Date:
              <input
                type="text"
                name="EXPIRYDATE"
                value={formatDate(editInvoice.EXPIRYDATE)}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Registration Number:
              <input
                type="text"
                name="REGISTRATIONNO"
                value={editInvoice.REGISTRATIONNO}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Payment Method Number:
              <input
                type="text"
                name="PMETHODNO"
                value={editInvoice.PMETHODNO}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditInvoice(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
