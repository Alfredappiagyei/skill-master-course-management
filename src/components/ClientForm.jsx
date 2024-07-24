import React, { Component } from 'react';
import Modal from './Modal';
import ClientTable from '../Tables/ClientTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      clientName: '',
      clientEmail: '',
      clientContact: '',
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
    const { clientName, clientEmail, clientContact } = this.state;
    const errors = {};

    if (!clientName) errors.clientName = 'Client Name is required';
    if (!clientEmail) errors.clientEmail = 'Email is required';
    if (!clientContact) errors.clientContact = 'Contact is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { clientName, clientEmail, clientContact } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, clientContact }),
      });

      const result = await response.json();


      if (response.ok) {
        toast.success('Client added successfully');
        this.setState({
          clientName: '',
          clientEmail: '',
          clientContact: '',
          errors: {},
        });
      } else {
        // Display specific error message from the server
        const errorMessage = result.errors || 'Error inserting client: Duplicate client email. Client already exists.';
  
        if (typeof errorMessage === 'string') {
          if (errorMessage.includes('Duplicate client email')) {
            toast.error('Failed to add client. Duplicate client email. Client already exists.');
          } else {
            toast.error('Failed to add client. Please check the details and try again.');
          }
        } 
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (clientNo) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/clients/${clientNo}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Client deleted successfully');
          // Refresh the client list or handle the state update accordingly
        } else {
          toast.error('Failed to delete client');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { showModal, clientName, clientEmail, clientContact, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='clientName'>Client Name</label>
              <input
                type='text'
                className='form-control'
                id='clientName'
                name='clientName'
                placeholder='Client Name'
                value={clientName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.clientName && <span className='error'>{errors.clientName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='clientEmail'>Email</label>
              <input
                type='email'
                className='form-control'
                id='clientEmail'
                name='clientEmail'
                placeholder='Email'
                value={clientEmail}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.clientEmail && <span className='error'>{errors.clientEmail}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='clientContact'>Contact</label>
              <input
                type='text'
                className='form-control'
                id='clientContact'
                name='clientContact'
                placeholder='Contact'
                value={clientContact}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.clientContact && <span className='error'>{errors.clientContact}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }}>
                Add New Client
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '200px' }}
                onClick={this.toggleModal}
              >
                View Clients
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <ClientTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default ClientForm;
