 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import RegistrationTable from '../Tables/RegistrationTable';

 

 
 
 class RegistrationForm extends Component {
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
             <input type="number" className="form-control" name="registrationNo" placeholder="Registration Number" style={{ width: "300px" }} /><br />
             <input type="date" className="form-control" name="registrationDate" placeholder="Registration Date" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="delegateNo" placeholder="Delegate Number" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="courseFeeNo" placeholder="Course Fee Number" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="registerEmployeeNo" placeholder="Employee Number" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="courseNo" placeholder="Course Number" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Register
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Registrations
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update 
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <RegistrationTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default RegistrationForm;
 