import React, { Component } from "react";
import { connect } from 'react-redux';
import './test/css/bootstrap.min.css';
import { addUser, deleteUser } from './Store/Actions';

import "./App.css";

import Employees from "./Pages/Employees";
import Sidebar from "./Pages/Sidebar";




export class App extends Component {

  addNewUser = newUser => {
    this.props.addUser(newUser)
  };

  deleteUser = user_id => {
    this.props.deleteUser(user_id);
  }

  render() {
    return (
      <div style={{ display: "flex", margin: 0, padding: 0, width: "100%", }}>
        <Employees />
      </div>

    );
  }
}


export default App;


