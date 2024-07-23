import React, { Component } from 'react';
import Modal from './Modal';
import EmployeeTable from '../Tables/EmployeeTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      employeeFName: '',
      employeeLName: '',
      employeeEmail: '',
      employeeContact: '',
      isLoading: false, // New state variable for loading indicator
      errors: {}, // Errors state for form validation
    };
  }

  toggleModal = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { employeeFName, employeeLName, employeeEmail, employeeContact } = this.state;
    const errors = {};
    if (!employeeFName) errors.employeeFName = 'First Name is required';
    if (!employeeLName) errors.employeeLName = 'Last Name is required';
    if (!employeeEmail) errors.employeeEmail = 'Email is required';
    if (!employeeContact) errors.employeeContact = 'Contact is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { employeeFName, employeeLName, employeeEmail, employeeContact } = this.state;

    // Set loading to true when submission starts
    this.setState({ isLoading: true });

    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeFName, employeeLName, employeeEmail, employeeContact }),
      });

      if (response.ok) {
        toast.success('Employee added successfully');
        this.setState({
          employeeFName: '',
          employeeLName: '',
          employeeEmail: '',
          employeeContact: '',
          errors: {},
        });
      } else {
        toast.error('Failed to add employee');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      // Set loading to false when submission ends
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { showModal, employeeFName, employeeLName, employeeEmail, employeeContact, isLoading, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='employeeFName'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='employeeFName'
                name='employeeFName'
                placeholder='First Name'
                value={employeeFName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.employeeFName && <span className='error'>{errors.employeeFName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='employeeLName'>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='employeeLName'
                name='employeeLName'
                placeholder='Last Name'
                value={employeeLName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.employeeLName && <span className='error'>{errors.employeeLName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='employeeEmail'>Email</label>
              <input
                type='email'
                className='form-control'
                id='employeeEmail'
                name='employeeEmail'
                placeholder='Email'
                value={employeeEmail}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.employeeEmail && <span className='error'>{errors.employeeEmail}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='employeeContact'>Contact</label>
              <input
                type='text'
                className='form-control'
                id='employeeContact'
                name='employeeContact'
                placeholder='Contact'
                value={employeeContact}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.employeeContact && <span className='error'>{errors.employeeContact}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add New Employee'}
              </button>
              <button className='button' type='button' style={{ width: '200px' }} onClick={this.toggleModal}>
                View Employees
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <EmployeeTable />
        </Modal>
      </div>
    );
  }
}

export default EmployeeForm;
