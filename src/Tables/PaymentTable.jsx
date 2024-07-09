import React, { useState, useEffect } from 'react';

export default function PaymentTable() {
  const [payments, setPayments] = useState([]);
  const [editPayment, setEditPayment] = useState(null);

  const handleViewPayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payments');
      const data = await response.json();
      setPayments(data);
    } catch (err) {
      console.error('Error fetching payments:', err);
    }
  };

  useEffect(() => {
    handleViewPayments();
  }, []);

  const handleDelete = async (pMethodNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/payments/${pMethodNo}`, { method: 'DELETE' });
      if (response.ok) {
        setPayments(payments.filter((payment) => payment.PMETHODNO !== pMethodNo));
        console.log('Payment method deleted successfully');
      } else {
        console.error('Failed to delete payment method');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = (payment) => {
    setEditPayment(payment);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditPayment({ ...editPayment, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating payment:', editPayment); // Check if editPayment has the updated values
  
      const response = await fetch(`http://localhost:3001/api/payments/${editPayment.PMETHODNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPayment),
      });
  
      if (response.ok) {
        const updatedPayment = await response.json(); // Assuming the API returns the updated payment
        console.log('Payment updated successfully:', updatedPayment); // Log updated payment details
  
        // Update the payments state to reflect the changes
        setPayments(payments.map((pay) => (pay.PMETHODNO === updatedPayment.PMETHODNO ? updatedPayment : pay)));
        setEditPayment(null); // Reset editPayment state after successful update
      } else {
        console.error('Failed to update payment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Payments</h4></div>
        </div>

        <section style={{ width: "100%" }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />

          <div className="row" style={{ width: "100%" }}>
            <div className="col-md-5"><b>Payment Method Number</b></div>
            <div className="col-md-5"><b>Payment Method Name</b></div>
            <div className="col-md-2"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {payments.map((payment, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-5">{payment.PMETHODNO}</div>
                <div className="col-md-5">{payment.PMETHODNAME}</div>
                <div className="col-md-2">
                  <button onClick={() => handleUpdate(payment)}>Update</button>
                  <button onClick={() => handleDelete(payment.PMETHODNO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editPayment && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Payment</h3>
              <label>
                Payment Method Name:
                <input type="text" name="PMETHODNAME" value={editPayment.PMETHODNAME} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditPayment(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
