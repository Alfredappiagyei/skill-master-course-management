import React, { Component } from 'react';
import Modal from './Modal';
import InvoiceTable from '../Tables/InvoiceTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      dateRaised: '',
      datePaid: '',
      creditCardNo: '',
      holdersName: '',
      expiryDate: '',
      registrationNo: '',
      pMethodNo: '',
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
    const { dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo } = this.state;
    const errors = {};

    if (!dateRaised) errors.dateRaised = 'Date Raised is required';
    if (!datePaid) errors.datePaid = 'Date Paid is required';
    if (!creditCardNo) errors.creditCardNo = 'Credit Card Number is required';
    if (!holdersName) errors.holdersName = 'Holder\'s Name is required';
    if (!expiryDate) errors.expiryDate = 'Expiry Date is required';
    if (!registrationNo) errors.registrationNo = 'Registration Number is required';
    if (!pMethodNo) errors.pMethodNo = 'Payment Method Number is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo }),
      });

      if (response.ok) {
        toast.success('Invoice added successfully');
        this.setState({
          dateRaised: '',
          datePaid: '',
          creditCardNo: '',
          holdersName: '',
          expiryDate: '',
          registrationNo: '',
          pMethodNo: '',
          errors: {}
        });
      } else {
        toast.error('Failed to add invoice');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  render() {
    const { showModal, dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo, errors } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='dateRaised'>Date Raised</label>
              <input
                type='date'
                className='form-control'
                id='dateRaised'
                name='dateRaised'
                placeholder='Date Raised'
                value={dateRaised}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.dateRaised && <span className='error'>{errors.dateRaised}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='datePaid'>Date Paid</label>
              <input
                type='date'
                className='form-control'
                id='datePaid'
                name='datePaid'
                placeholder='Date Paid'
                value={datePaid}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.datePaid && <span className='error'>{errors.datePaid}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='creditCardNo'>Credit Card Number</label>
              <input
                type='number'
                className='form-control'
                id='creditCardNo'
                name='creditCardNo'
                placeholder='Credit Card Number'
                value={creditCardNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.creditCardNo && <span className='error'>{errors.creditCardNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='holdersName'>Holder's Name</label>
              <input
                type='text'
                className='form-control'
                id='holdersName'
                name='holdersName'
                placeholder='Holder Name'
                value={holdersName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.holdersName && <span className='error'>{errors.holdersName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='expiryDate'>Expiry Date</label>
              <input
                type='date'
                className='form-control'
                id='expiryDate'
                name='expiryDate'
                placeholder='Expiry Date'
                value={expiryDate}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.expiryDate && <span className='error'>{errors.expiryDate}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='registrationNo'>Registration Number</label>
              <input
                type='number'
                className='form-control'
                id='registrationNo'
                name='registrationNo'
                placeholder='Registration Number'
                value={registrationNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.registrationNo && <span className='error'>{errors.registrationNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='pMethodNo'>Payment Method Number</label>
              <input
                type='number'
                className='form-control'
                id='pMethodNo'
                name='pMethodNo'
                placeholder='Payment Method Number'
                value={pMethodNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.pMethodNo && <span className='error'>{errors.pMethodNo}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '250px' }}>
                Add New Invoice
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '250px' }}
                onClick={this.toggleModal}
              >
                View Invoices
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <InvoiceTable />
        </Modal>
      </div>
    );
  }
}

export default InvoiceForm;
