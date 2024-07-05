 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import DelegateTable from '../Tables/DelegateTable';
 

 
 
 class DelegatetForm extends Component {
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
             <input type="text" className="form-control" name="delegateNo" placeholder="Delegate Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="delegateFName" placeholder="First Name" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="delegateLName" placeholder="Last Name" style={{ width: "300px" }} /><br />
             <input type="email" className="form-control" name="delegateStreet" placeholder="Delegate Street" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="delegateCity" placeholder="Delegate City" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="delegateState" placeholder="Delegate State" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="delegateZipCode" placeholder="Delegate Zip Code" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="attTelNo" placeholder="attTelNo" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="attFaxNo" placeholder="attFaxNo" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="attEmailAddress" placeholder="attEmailAddress" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="ClientNo" placeholder="Client Number" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New delegate
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View delegates
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update delegate
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <DelegateTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default DelegatetForm;
 