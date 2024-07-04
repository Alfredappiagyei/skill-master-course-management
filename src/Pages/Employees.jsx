import React, { Component } from "react";
 
import '../test/css/bootstrap.min.css';
 
 
import "../App.css";
 
import Sidebar from "./Sidebar";
import EmployeeForm from "../components/EmployeeForm";


export class Employees extends Component {

  addNewUser = newUser => {
    this.props.addUser(newUser)
  };

  deleteUser = user_id => {
    this.props.deleteUser(user_id);
  }

  render() {
    return (
      <div style={{ display: "flex", margin: 0, padding: 0, width: "100%", }}>
        <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
          <Sidebar />
        </div>

        <div className="col-md-10">

          <div className="dashboard">
            <div className="nav">
              <b>Employees</b>
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-xs-12">

                  <div className="section2" style={{ marginTop: "50px" }}>
                    <EmployeeForm />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>


      </div>
    );
  }
}


export default Employees;


