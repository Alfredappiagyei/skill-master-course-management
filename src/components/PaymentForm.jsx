import React, { Component } from 'react';
import Modal from './Modal';
import PaymentTable from '../Tables/PaymentTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      pMethodName: '',
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
    const { pMethodName } = this.state;
    const errors = {};

    if (!pMethodName) errors.pMethodName = 'Payment Method Name is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { pMethodName } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/paymentMethods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pMethodName }),
      });

      if (response.ok) {
        toast.success('Payment method added successfully');
        this.setState({ pMethodName: '', errors: {} });
      } else {
        toast.error('Failed to add payment method');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  render() {
    const { showModal, pMethodName, errors } = this.state;

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <ToastContainer />
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className='form-group'>
              <label htmlFor='pMethodName'>Payment Method Name</label>
              <input
                type='text'
                className='form-control'
                id='pMethodName'
                name='pMethodName'
                placeholder='Payment Method Name'
                value={pMethodName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.pMethodName && <span className='error'>{errors.pMethodName}</span>}
            </div>
            <button className='button' type='submit' style={{ width: '250px' }}>
              Add New Payment Method
            </button>
            <button
              className='button'
              type='button'
              style={{ width: '220px' }}
              onClick={this.toggleModal}
            >
              View Payment Methods
            </button>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <PaymentTable />
        </Modal>
      </div>
    );
  }
}

export default PaymentForm;
