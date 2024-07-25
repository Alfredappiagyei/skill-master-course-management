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
      const response = await fetch(`http://localhost:3001/api/payments/${editPayment.PMETHODNO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPayment),
      });

      if (response.ok) {
        const updatedPayment = await response.json();
        setPayments(
          payments.map((pay) =>
            pay.PMETHODNO === updatedPayment.PMETHODNO ? updatedPayment : pay
          )
        );
        setEditPayment(null);
      } else {
        console.error('Failed to update payment');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all">
          <h4>All Payments</h4>
        </div>
      </div>
      <section style={{ width: '100%' }}>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Payment Method Number</th>
              <th>Payment Method Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.PMETHODNO}</td>
                <td>{payment.PMETHODNAME}</td>
                <td>
                  <button onClick={() => handleUpdate(payment)}>Update</button>
                  <button onClick={() => handleDelete(payment.PMETHODNO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {editPayment && (
          <form onSubmit={handleFormSubmit}>
            <h3>Edit Payment</h3>
            <label>
              Payment Method Name:
              <input
                type="text"
                name="PMETHODNAME"
                value={editPayment.PMETHODNAME}
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Update</button>
            <button type="button" onClick={() => setEditPayment(null)}>Cancel</button>
          </form>
        )}
      </section>
    </div>
  );
}
