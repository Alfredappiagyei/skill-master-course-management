 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import LocationTable from '../Tables/LocationTable';


 
 
 class LocationForm extends Component {
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
             <input type="text" className="form-control" name="employeeNo" placeholder="Employee Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="employeeFName" placeholder="First Name" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="employeeLName" placeholder="Last Name" style={{ width: "300px" }} /><br />
             <input type="email" className="form-control" name="employeeEmail" placeholder="Email" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="employeeContact" placeholder="Contact" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Location
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Locations
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Location
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <LocationTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default LocationForm;
 