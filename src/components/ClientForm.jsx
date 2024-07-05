 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import ClientTable from '../Tables/ClientTable';

 
 
 class ClientForm extends Component {
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
             <input type="text" className="form-control" name="clientNo" placeholder="Client Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="clientName" placeholder="CLient Name" style={{ width: "300px" }} /><br />
             <input type="email" className="form-control" name="clientEmail" placeholder="Email" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="clientContact" placeholder="Contact" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Client
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Clients
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Client
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <ClientTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default ClientForm;
 