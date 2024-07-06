import React, { useState, useEffect } from 'react';

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState([]);

  const handleViewInvoices = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/invoices');
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    }
  };

  useEffect(() => {
    handleViewInvoices();
  }, []);
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Invoices</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-1"><b>Invoice  Number</b></div>
          <div className="col-md-1" ><b>Date Raised</b></div>
          <div className="col-md-1" ><b>Date Paid</b></div>
          <div className="col-md-3" ><b>Credit Card Number</b></div>
          <div className="col-md-3" ><b>Holders Name</b></div>
          <div className="col-md-1" ><b>Expiry Date</b></div>
          <div className="col-md-1" ><b>Registration Number</b></div>
          <div className="col-md-1" ><b>Payment Method Number</b></div>

        
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

              </div>
            ))}
          </div>

      </section>
    </div>
  </div>
  )
}
