import React, { useState, useEffect } from 'react';

export default function PaymentTable() {

  const [payments, setPayments] = useState([]);

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
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Payments</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-6"><b>Payment Method Number</b></div>
          <div className="col-md-6" ><b>Payment Method Name</b></div>
        
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {payments.map((payment, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-6">{payment.PMETHODNO}</div>
                <div className="col-md-6">{payment.PMETHODNAME}</div>
              </div>
            ))}
          </div>
      </section>
    </div>
  </div>
  )
}
