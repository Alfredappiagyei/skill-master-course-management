import React, { useState, useEffect } from 'react';

export default function DelegateTable() {
  const [delegates, setDelegates] = useState([]);

  const handleViewDelegates = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/delegates');
      const data = await response.json();
      setDelegates(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  useEffect(() => {
    handleViewDelegates();
  }, []);
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Delegates</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-1"><b>Delegate Number</b></div>
          <div className="col-md-1" ><b>Title/Industry</b></div>
          <div className="col-md-1"><b>First Name</b></div>
          <div className="col-md-1"> <b>Last Name</b></div>
          <div className="col-md-1"> <b>Street</b></div>
          <div className="col-md-1"><b>City</b></div>
          <div className="col-md-1"><b>State</b></div>
          <div className="col-md-1"><b>Zip Code</b></div>
          <div className="col-md-1"><b>Tel No</b></div>
          <div className="col-md-1"><b>Fax No</b></div>
          <div className="col-md-1"><b>Email</b></div>
          <div className="col-md-1"><b>Client Number</b></div>
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {delegates.map((delegate, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
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
              </div>
            ))}
          </div>
      </section>
    </div>
  </div>
  )
}
