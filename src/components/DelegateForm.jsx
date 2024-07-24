import React, { Component } from 'react';
import Modal from './Modal';
import DelegateTable from '../Tables/DelegateTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DelegateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      delegateTitle: '',
      delegateFName: '',
      delegateLName: '',
      delegateStreet: '',
      delegateCity: '',
      delegateState: '',
      delegateZipCode: '',
      attTelNo: '',
      attFaxNo: '',
      attEmailAddress: '',
      clientNo: '',
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
    const {
      delegateTitle,
      delegateFName,
      delegateLName,
      delegateCity,
      attTelNo,
      attEmailAddress,
    } = this.state;

    const errors = {};
    if (!delegateTitle) errors.delegateTitle = 'Title is required';
    if (!delegateFName) errors.delegateFName = 'First Name is required';
    if (!delegateLName) errors.delegateLName = 'Last Name is required';
    if (!delegateCity) errors.delegateCity = 'City is required';
    if (!attTelNo) errors.attTelNo = 'Tel Number is required';
    if (!attEmailAddress) errors.attEmailAddress = 'Email Address is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    const {
      delegateTitle,
      delegateFName,
      delegateLName,
      delegateStreet,
      delegateCity,
      delegateState,
      delegateZipCode,
      attTelNo,
      attFaxNo,
      attEmailAddress,
      clientNo,
    } = this.state;
  
    try {
      const response = await fetch('http://localhost:3001/api/delegates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          delegateTitle,
          delegateFName,
          delegateLName,
          delegateStreet,
          delegateCity,
          delegateState,
          delegateZipCode,
          attTelNo,
          attFaxNo,
          attEmailAddress,
          clientNo,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success('Delegate added successfully');
        this.setState({
          delegateTitle: '',
          delegateFName: '',
          delegateLName: '',
          delegateStreet: '',
          delegateCity: '',
          delegateState: '',
          delegateZipCode: '',
          attTelNo: '',
          attFaxNo: '',
          attEmailAddress: '',
          clientNo: '',
          errors: {},
        });
      } else {
        const errorMessage = result.error;
        if (errorMessage.includes('Duplicate delegate email')) {
          toast.error('Failed to add delegate. Duplicate delegate email. Delegate already exists.');
        } else if (errorMessage.includes('Client number does not exist')) {
          toast.error('Failed to add delegate. Client number does not exist. Enter an already existing client number.');
        } else {
          toast.error('Failed to add delegate. Please check the details and try again.');
        }
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };
  
  handleDelete = async (delegateNo) => {
    if (window.confirm('Are you sure you want to delete this delegate?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/delegates/${delegateNo}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Delegate deleted successfully');
          // Refresh the delegate list or handle the state update accordingly
        } else {
          toast.error('Failed to delete delegate');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const {
      showModal,
      delegateTitle,
      delegateFName,
      delegateLName,
      delegateStreet,
      delegateCity,
      delegateState,
      delegateZipCode,
      attTelNo,
      attFaxNo,
      attEmailAddress,
      clientNo,
      errors,
    } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='delegateTitle'>Title</label>
              <input
                type='text'
                className='form-control'
                id='delegateTitle'
                name='delegateTitle'
                placeholder='Title'
                value={delegateTitle}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateTitle && <span className='error'>{errors.delegateTitle}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateFName'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='delegateFName'
                name='delegateFName'
                placeholder='First Name'
                value={delegateFName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateFName && <span className='error'>{errors.delegateFName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateLName'>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='delegateLName'
                name='delegateLName'
                placeholder='Last Name'
                value={delegateLName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateLName && <span className='error'>{errors.delegateLName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateStreet'>Street</label>
              <input
                type='text'
                className='form-control'
                id='delegateStreet'
                name='delegateStreet'
                placeholder='Street'
                value={delegateStreet}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateStreet && <span className='error'>{errors.delegateStreet}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateCity'>City</label>
              <input
                type='text'
                className='form-control'
                id='delegateCity'
                name='delegateCity'
                placeholder='City'
                value={delegateCity}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateCity && <span className='error'>{errors.delegateCity}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateState'>State</label>
              <input
                type='text'
                className='form-control'
                id='delegateState'
                name='delegateState'
                placeholder='State'
                value={delegateState}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateState && <span className='error'>{errors.delegateState}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delegateZipCode'>Zip Code</label>
              <input
                type='text'
                className='form-control'
                id='delegateZipCode'
                name='delegateZipCode'
                placeholder='Zip Code'
                value={delegateZipCode}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delegateZipCode && <span className='error'>{errors.delegateZipCode}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='attTelNo'>Tel Number</label>
              <input
                type='tel'
                className='form-control'
                id='attTelNo'
                name='attTelNo'
                placeholder='Tel Number'
                value={attTelNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.attTelNo && <span className='error'>{errors.attTelNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='attFaxNo'>Fax Number</label>
              <input
                type='tel'
                className='form-control'
                id='attFaxNo'
                name='attFaxNo'
                placeholder='Fax Number'
                value={attFaxNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='attEmailAddress'>Email Address</label>
              <input
                type='email'
                className='form-control'
                id='attEmailAddress'
                name='attEmailAddress'
                placeholder='Email Address'
                value={attEmailAddress}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.attEmailAddress && <span className='error'>{errors.attEmailAddress}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='clientNo'>Client Number</label>
              <input
                type='text'
                className='form-control'
                id='clientNo'
                name='clientNo'
                placeholder='Client Number'
                value={clientNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.clientNo && <span className='error'>{errors.clientNo}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }}>
                Add New Delegate
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '200px' }}
                onClick={this.toggleModal}
              >
                View Delegates
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <DelegateTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default DelegateForm;
