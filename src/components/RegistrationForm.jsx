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
             <input type="number" className="form-control" name="registrationNo" placeholder="registrationNo" style={{ width: "300px" }} /><br />
             <input type="date" className="form-control" name="registrationDate" placeholder="registrationDate" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="delegateNo" placeholder="delegateNo" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="courseFeeNo" placeholder="courseFeeNo" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="registerEmployeeNo" placeholder="registerEmployeeNo" style={{ width: "300px" }} /><br />
             <input type="number" className="form-control" name="courseNo" placeholder="courseNo" style={{ width: "300px" }} /><br />
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
 