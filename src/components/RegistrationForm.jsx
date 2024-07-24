import React, { Component } from 'react';
import Modal from './Modal';
import RegistrationTable from '../Tables/RegistrationTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      registrationDate: '',
      delegateNo: '',
      courseFeeNo: '',
      registerEmployeeNo: '',
      courseNo: '',
      errors: {},
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo } = this.state;
    const errors = {};

    if (!registrationDate) errors.registrationDate = 'Registration Date is required';
    if (!delegateNo) errors.delegateNo = 'Delegate Number is required';
    if (!courseFeeNo) errors.courseFeeNo = 'Course Fee Number is required';
    if (!registerEmployeeNo) errors.registerEmployeeNo = 'Register Employee Number is required';
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

    const { registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Registration added successfully');
        this.setState({
          registrationDate: '',
          delegateNo: '',
          courseFeeNo: '',
          registerEmployeeNo: '',
          courseNo: '',
          errors: {},
        });
      } else {
        const errorMessage = result.error;
        if (errorMessage.includes('Employee number does not exist')) {
          toast.error('Employee number does not exist. Enter an already existing deliverer employee number.');
        } else if (errorMessage.includes('The selected employee is already assigned')) {
          toast.error('Employee is already assigned a different course. Enter a different employee number.');
        } else {
          toast.error('Failed to add course. Please check the details and try again.');
        }
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  render() {
    const { showModal, registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='registrationDate'>Registration Date</label>
              <input
                type='date'
                className='form-control'
                id='registrationDate'
                name='registrationDate'
                placeholder='Registration Date'
                value={registrationDate}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.registrationDate && <span className='error'>{errors.registrationDate}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateNo'>Delegate Number</label>
              <input
                type='number'
                className='form-control'
                id='delegateNo'
                name='delegateNo'
                placeholder='Delegate Number'
                value={delegateNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateNo && <span className='error'>{errors.delegateNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='courseFeeNo'>Course Fee Number</label>
              <input
                type='number'
                className='form-control'
                id='courseFeeNo'
                name='courseFeeNo'
                placeholder='Course Fee Number'
                value={courseFeeNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseFeeNo && <span className='error'>{errors.courseFeeNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='registerEmployeeNo'>Register Employee Number</label>
              <input
                type='number'
                className='form-control'
                id='registerEmployeeNo'
                name='registerEmployeeNo'
                placeholder='Register Employee Number'
                value={registerEmployeeNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.registerEmployeeNo && <span className='error'>{errors.registerEmployeeNo}</span>}
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
                Add New Registration
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '250px' }}
                onClick={this.toggleModal}
              >
                View Registrations
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <RegistrationTable />
        </Modal>
      </div>
    );
  }
}

export default RegistrationForm;
