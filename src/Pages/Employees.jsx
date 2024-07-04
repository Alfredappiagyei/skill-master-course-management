import React, { Component } from "react";
import { connect } from 'react-redux';
import '../test/css/bootstrap.min.css';
import { addUser, deleteUser } from '../Store/Actions';
import UserForm from "../components/Form";
import "../App.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";


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
                    <UserForm />
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


