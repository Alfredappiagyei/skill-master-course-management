 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import PaymentTable from '../Tables/PaymentTable';
 

 
 
 class PaymentForm extends Component {
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
             <input type="text" className="form-control" name="pMethodNo" placeholder="Payment Method Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name=" pMethodName" placeholder="Payment Method Name" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Payment
           </button>
           <button className="button" style={{ fontSize: "10px",width: "200px" }} onClick={this.toggleModal}>
             View Payment Methods
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Payment
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <PaymentTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default PaymentForm;
 