import React, { Component } from 'react';
import Modal from './Modal';
import CourseFeeTable from '../Tables/CourseFeeTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CourseFeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      feeDescription: '',
      fee: '',
      courseNo: '',
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
    const { feeDescription, fee, courseNo } = this.state;
    const errors = {};

    if (!feeDescription) errors.feeDescription = 'Fee Description is required';
    if (!fee) errors.fee = 'Fee is required';
    if (!courseNo) errors.courseNo = 'Course Number is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { feeDescription, fee, courseNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/courseFees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeDescription, fee, courseNo }),
      });

      if (response.ok) {
        toast.success('Course fee added successfully');
        this.setState({
          feeDescription: '',
          fee: '',
          courseNo: '',
          errors: {},
        });
      } else {
        const errorResponse = await response.json();
        toast.error('Failed to add course fee');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (feeId) => {
    if (window.confirm('Are you sure you want to delete this course fee?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/courseFees/${feeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Course fee deleted successfully');
          // Refresh the course fee list or handle the state update accordingly
        } else {
          toast.error('Failed to delete course fee');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { showModal, feeDescription, fee, courseNo, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='feeDescription'>Fee Description</label>
              <input
                type='text'
                className='form-control'
                id='feeDescription'
                name='feeDescription'
                placeholder='Fee Description'
                value={feeDescription}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.feeDescription && <span className='error'>{errors.feeDescription}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='fee'>Fee</label>
              <input
                type='number'
                className='form-control'
                id='fee'
                name='fee'
                placeholder='Fee'
                value={fee}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.fee && <span className='error'>{errors.fee}</span>}
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
              <button className='button' type='submit' style={{ width: '250px' }}>
                Add New Course Fee
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '250px' }}
                onClick={this.toggleModal}
              >
                View Course Fees
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseFeeTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default CourseFeeForm;
