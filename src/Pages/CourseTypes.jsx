
import React from 'react'
import '../test/css/bootstrap.min.css';
 
import "../App.css";
 
import Sidebar from "./Sidebar";
import CourseTypesForm from '../components/CourseTypeForm';

 

export default function CourseTypes() {
  return (
    <div style={{ display: "flex", margin: 0, padding: 0, width: "100%", }}>
    <div className="col-md-2" style={{ margin: "0px", padding: "0px" }}>
      <Sidebar />
    </div>

    <div className="col-md-10">

      <div className="dashboard">
        <div className="nav">
          <b>Course Types</b>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xs-12">

              <div className="section2" style={{ marginTop: "50px" }}>
                <CourseTypesForm />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>


  </div>
  )
}

