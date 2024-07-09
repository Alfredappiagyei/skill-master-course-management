import React, { Component } from 'react';
import Modal from './Modal';
import BookingsTable from '../Tables/BookingsTable';

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      bookingDate: '',
      locationNo: '',
      courseNo: '',
      bookingEmployeeNo: ''
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { bookingDate, locationNo, courseNo, bookingEmployeeNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingDate, locationNo, courseNo, bookingEmployeeNo })
      });

      if (response.ok) {
        console.log('Booking added successfully');
        this.setState({
          bookingDate: '',
          locationNo: '',
          courseNo: '',
          bookingEmployeeNo: ''
        });
      } else {
        console.error('Failed to add booking');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, bookingDate, locationNo, courseNo, bookingEmployeeNo } = this.state;

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="date" className="form-control" name="bookingDate" placeholder="Booking Date" value={bookingDate} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="locationNo" placeholder="Location Number" value={locationNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="courseNo" placeholder="Course Number" value={courseNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="bookingEmployeeNo" placeholder="Booking Employee Number" value={bookingEmployeeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
          <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
            Add New Booking
          </button>
          <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
            View Bookings
          </button>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <BookingsTable />
        </Modal>
      </div>
    );
  }
}

export default BookingForm;
