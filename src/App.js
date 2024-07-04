import React, { Component } from "react";
 
import './test/css/bootstrap.min.css';
 

import "./App.css";

import Employees from "./Pages/Employees";
 




export class App extends Component {


  render() {
    return (
      <div style={{ display: "flex", margin: 0, padding: 0, width: "100%", }}>
        <Employees />
      </div>

    );
  }
}


export default App;


