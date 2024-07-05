 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import CourseFeeTable from '../Tables/CourseFeeTable';


 
 
 class CourseFeeForm extends Component {
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
             <input type="text" className="form-control" name=" courseFeeNo" placeholder=" Course Fee Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="feeDescription" placeholder="Fee Description" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="fee" placeholder="Course" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="courseNo" placeholder="Course Number" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Fee
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Course Fees
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Fees
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <CourseFeeTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default CourseFeeForm;
 