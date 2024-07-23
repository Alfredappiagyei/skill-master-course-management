import React, { Component } from 'react';
import Modal from './Modal';
import BookingsTable from '../Tables/BookingsTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      bookingDate: '',
      locationNo: '',
      courseNo: '',
      bookingEmployeeNo: '',
      errors: {},
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { bookingDate, locationNo, courseNo, bookingEmployeeNo } = this.state;
    const errors = {};
    if (!bookingDate) errors.bookingDate = 'Booking Date is required';
    if (!locationNo) errors.locationNo = 'Location Number is required';
    if (!courseNo) errors.courseNo = 'Course Number is required';
    if (!bookingEmployeeNo) errors.bookingEmployeeNo = 'Booking Employee Number is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { bookingDate, locationNo, courseNo, bookingEmployeeNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingDate, locationNo, courseNo, bookingEmployeeNo }),
      });

      if (response.ok) {
        toast.success('Booking added successfully');
        this.setState({
          bookingDate: '',
          locationNo: '',
          courseNo: '',
          bookingEmployeeNo: '',
          errors: {},
        });
      } else {
        const errorResponse = await response.json();
        toast.error(`Failed to add booking: ${errorResponse.message}`);
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (bookingNo) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/bookings/${bookingNo}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Booking deleted successfully');
          // Refresh the booking list or handle the state update accordingly
        } else {
          toast.error('Failed to delete booking');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { showModal, bookingDate, locationNo, courseNo, bookingEmployeeNo, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='bookingDate'>Booking Date</label>
              <input
                type='date'
                className='form-control'
                id='bookingDate'
                name='bookingDate'
                placeholder='Booking Date'
                value={bookingDate}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.bookingDate && <span className='error'>{errors.bookingDate}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='locationNo'>Location Number</label>
              <input
                type='number'
                className='form-control'
                id='locationNo'
                name='locationNo'
                placeholder='Location Number'
                value={locationNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.locationNo && <span className='error'>{errors.locationNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='courseNo'>Course Number</label>
              <input
                type='number'
                className='form-control'
                id='courseNo'
                name='courseNo'
                placeholder='Course Number'
                value={courseNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseNo && <span className='error'>{errors.courseNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='bookingEmployeeNo'>Booking Employee Number</label>
              <input
                type='number'
                className='form-control'
                id='bookingEmployeeNo'
                name='bookingEmployeeNo'
                placeholder='Booking Employee Number'
                value={bookingEmployeeNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.bookingEmployeeNo && <span className='error'>{errors.bookingEmployeeNo}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }}>
                Add New Booking
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '200px' }}
                onClick={this.toggleModal}
              >
                View Bookings
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <BookingsTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default BookingForm;
