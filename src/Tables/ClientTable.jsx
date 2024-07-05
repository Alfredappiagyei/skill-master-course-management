import React, { useState, useEffect } from 'react';

export default function ClientTable() {
  const [clients, setClients] = useState([]);

  const handleViewClients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/clients');
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
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


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-3" style={{ paddingRight: "100px" }}><b>Client Number</b></div>
          <div className="col-md-3" ><b>Client Name</b></div>
          <div className="col-md-3"><b>Client Email</b></div>
          <div className="col-md-3"> <b>Client Contact</b></div>
        </div>
        <hr />
        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
            {clients.map((client, index) => (
              <div key={index} className="row" style={{ width: "100%" }}>
                <div className="col-md-3">{client.CLIENTNO}</div>
                <div className="col-md-3">{client.CLIENTNAME}</div>
                <div className="col-md-3">{client.CLIENTEMAIL}</div>
                <div className="col-md-3">{client.CLIENTCONTACT}</div>
              </div>
            ))}
          </div>

       
      </section>
    </div>
  </div>
  )
}
