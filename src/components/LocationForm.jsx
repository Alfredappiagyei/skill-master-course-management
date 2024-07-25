import React, { Component } from 'react';
import Modal from './Modal';
import LocationTable from '../Tables/LocationTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      locationName: '',
      locationMaxSize: '',
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
    const { locationName, locationMaxSize } = this.state;
    const errors = {};

    if (!locationName) errors.locationName = 'Location Name is required';
    if (!locationMaxSize) errors.locationMaxSize = 'Max Size is required';
    else if (locationMaxSize <= 0) errors.locationMaxSize = 'Max Size must be greater than 0';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    const { locationName, locationMaxSize } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName, locationMaxSize }),
      });

      if (response.ok) {
        toast.success('Location added successfully');
        this.setState({ locationName: '', locationMaxSize: '', errors: {} });
      } else {
        toast.error('Failed to add location');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (locationId) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/locations/${locationId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Location deleted successfully');
          // Refresh the location list or handle the state update accordingly
        } else {
          toast.error('Failed to delete location');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { showModal, locationName, locationMaxSize, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor='locationName' style={{ display: 'block', marginBottom: '5px' }}>Location Name</label>
              <input
                type='text'
                className='form-control'
                name='locationName'
                id='locationName'
                placeholder='Location Name'
                value={locationName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.locationName && <span className='error' style={{ color: 'red' }}>{errors.locationName}</span>}
            </div>
            <div>
              <label htmlFor='locationMaxSize' style={{ display: 'block', marginBottom: '5px' }}>Max Size</label>
              <input
                type='number'
                className='form-control'
                name='locationMaxSize'
                id='locationMaxSize'
                placeholder='Max Size'
                value={locationMaxSize}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.locationMaxSize && <span className='error' style={{ color: 'red' }}>{errors.locationMaxSize}</span>}
            </div>
            <br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', textAlign: 'center', gap: 10 }}>
          <button className='button' style={{ width: '200px' }} onClick={this.handleSubmit}>
            Add New Location
          </button>
          <button className='button' style={{ width: '200px' }} onClick={this.toggleModal}>
            View Locations
          </button>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <LocationTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default LocationForm;
