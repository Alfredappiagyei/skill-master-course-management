 // UserForm.js
 import React, { Component } from 'react';
 import Modal from './Modal';
import BookingTable from '../Tables/BookingsTable';


 
 
 class BookingForm extends Component {
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
             <input type="text" className="form-control" name="bookingNo" placeholder="Booking Number" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="bookingdate" placeholder="bookingDate" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name="locationNo" placeholder="location Number" style={{ width: "300px" }} /><br />
             <input type="email" className="form-control" name="courseNo" placeholder="courseNo" style={{ width: "300px" }} /><br />
             <input type="text" className="form-control" name=" bookingEmployeeNo " placeholder=" bookingEmployeeNo" style={{ width: "300px" }} /><br />
           </form>
         </div>
 
         <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Booking
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Booking
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Booking
           </button>
         </div>
 
         <Modal show={showModal} handleClose={this.toggleModal}>
           <BookingTable />
         </Modal>
       </div>
     );
   }
 }
 
 export default BookingForm;
 