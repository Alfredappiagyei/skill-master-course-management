import React, { Component } from "react";
 
import './test/css/bootstrap.min.css';
 

import "./App.css";

 
import Home from "./Pages/Home";
 




export class App extends Component {


  render() {
    return (
      <div style={{ display: "flex", margin: 0, padding: 0, width: "100%", }}>
        <Home/>
      </div>

    );
  }
}


export default App;


