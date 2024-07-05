 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import CourseTypesTable from '../Tables/CourseTypesTable';
 

 
 
 class CourseTypesForm extends Component {
   constructor(props) {
     super(props);
     this.state = {
       showModal: false,
     };
   }
 
   toggleModal = () => {
     this.setState(prevState => ({ showModal: !prevState.showModal }));
   };
 
   handleSubmit = (e) => {
     e.preventDefault();
     // Handle form submission logic here
   };
 
   render() {
     const { showModal } = this.state;
     return (
       <div style={{ width: "100%", height:"100vh" }}>
         <div className='col-md-6'>
           <form onSubmit={this.handleSubmit}>
             <input type="text" className="form-control" name="CourseTypeNo" placeholder="CourseTypeNo" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="courseTypeDescription" placeholder="courseTypeDescription" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "220px" }} onClick={this.handleSubmit}>
             Add New Course Type
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Course Types
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Course Type
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <CourseTypesTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default CourseTypesForm;
 