 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import InvoiceTable from '../Tables/InvoiceTable';

 
 class InvoiceForm extends Component {
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
             <input type="text" className="form-control" name="invoiceno" placeholder="Invoice number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="dateraised" placeholder="Date Raised" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="datepaid" placeholder="Date Paid" style={{ width: "300px" }} /><br />
             <input type="email" className="form-control" name="creditCardNo" placeholder="Credit Crad Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="holdername" placeholder="Holder Name" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="expirydate" placeholder="Expiry Date" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="registrationnumber" placeholder="Registeration Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="pMthodno" placeholder="Payment Method Number" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Invoice
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Invoices
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Invoice
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <InvoiceTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default InvoiceForm;
 