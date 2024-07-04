import React from 'react'

export default function ClientTable() {
  return (
   
    <div className="table">
    <div className="row">

      <div className="all-startups">
        <div className="all"><h4>All Clients</h4></div>
      </div>


      <section style={{ width: "100%" }} >
        <input type="text" id="search2" class="form-control" placeholder="Dashboard" />


        <div className="row" style={{ width: "100%" }}>
          <div className="col-md-3" style={{ paddingRight: "100px" }}><b>Company</b></div>
          <div className="col-md-2" ><b>Marketing/Industry</b></div>
          <div className="col-md-2"><b>Location</b></div>
          <div className="col-md-2"> <b>Joined</b></div>
          <div className="col-md-1"> <b>Approved</b></div>
          <div className="col-md-1"><b>Action</b></div>
        </div>
        <hr />

        <div className="row" style={{ width: "100%", marginLeft: "1px" }}>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
          <h3>Table Here</h3>
        </div>

      </section>
    </div>
  </div>
  )
}
