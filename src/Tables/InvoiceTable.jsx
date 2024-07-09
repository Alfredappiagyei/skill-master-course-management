import React, { useState, useEffect } from 'react';

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

  // Delete invoice by invoiceNo
  const handleDelete = async (invoiceNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/invoices/${invoiceNo}`, { method: 'DELETE' });
      if (response.ok) {
        setInvoices(invoices.filter((invoice) => invoice.INVOICENO !== invoiceNo));
        console.log('Invoice deleted successfully');
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
      console.log('Updating invoice:', editInvoice); // Check if editInvoice has the updated values

      const response = await fetch(`http://localhost:3001/api/invoices/${editInvoice.INVOICENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editInvoice),
      });

      if (response.ok) {
        const updatedInvoice = await response.json(); // Assuming the API returns the updated invoice
        console.log('Invoice updated successfully:', updatedInvoice); // Log updated invoice details

        // Update the invoices state to reflect the changes
        setInvoices(invoices.map((inv) => (inv.INVOICENO === updatedInvoice.INVOICENO ? updatedInvoice : inv)));
        setEditInvoice(null); // Reset editInvoice state after successful update
      } else {
        console.error('Failed to update invoice');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Invoices</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-1"><b>Invoice Number</b></div>
            <div className="col-md-1"><b>Date Raised</b></div>
            <div className="col-md-1"><b>Date Paid</b></div>
            <div className="col-md-3"><b>Credit Card Number</b></div>
            <div className="col-md-3"><b>Holders Name</b></div>
            <div className="col-md-1"><b>Expiry Date</b></div>
            <div className="col-md-1"><b>Registration Number</b></div>
            <div className="col-md-1"><b>Payment Method Number</b></div>
            <div className="col-md-1"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {invoices.map((invoice, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-1">{invoice.INVOICENO}</div>
                <div className="col-md-1">{invoice.DATERAISED}</div>
                <div className="col-md-1">{invoice.DATEPAID}</div>
                <div className="col-md-3">{invoice.CREDITCARDNO}</div>
                <div className="col-md-3">{invoice.HOLDERSNAME}</div>
                <div className="col-md-1">{invoice.EXPIRYDATE}</div>
                <div className="col-md-1">{invoice.REGISTRATIONNO}</div>
                <div className="col-md-1">{invoice.PMETHODNO}</div>
                <div className="col-md-1">
                  <button onClick={() => handleUpdate(invoice)}>Update</button>
                  <button onClick={() => handleDelete(invoice.INVOICENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editInvoice && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Invoice</h3>
              <label>
                Date Raised:
                <input type="text" name="DATERAISED" value={editInvoice.DATERAISED} onChange={handleFormChange} />
              </label>
              <label>
                Date Paid:
                <input type="text" name="DATEPAID" value={editInvoice.DATEPAID} onChange={handleFormChange} />
              </label>
              <label>
                Credit Card Number:
                <input type="text" name="CREDITCARDNO" value={editInvoice.CREDITCARDNO} onChange={handleFormChange} />
              </label>
              <label>
                Holder's Name:
                <input type="text" name="HOLDERSNAME" value={editInvoice.HOLDERSNAME} onChange={handleFormChange} />
              </label>
              <label>
                Expiry Date:
                <input type="text" name="EXPIRYDATE" value={editInvoice.EXPIRYDATE} onChange={handleFormChange} />
              </label>
              <label>
                Registration Number:
                <input type="text" name="REGISTRATIONNO" value={editInvoice.REGISTRATIONNO} onChange={handleFormChange} />
              </label>
              <label>
                Payment Method Number:
                <input type="text" name="PMETHODNO" value={editInvoice.PMETHODNO} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditInvoice(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
