import React, { Component } from 'react';
import Modal from './Modal';
import InvoiceTable from '../Tables/InvoiceTable';

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
      pMethodNo: ''
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
    const { dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo })
      });

      if (response.ok) {
        console.log('Invoice added successfully');
        this.setState({ dateRaised: '', datePaid: '', creditCardNo: '', holdersName: '', expiryDate: '', registrationNo: '', pMethodNo: '' });
      } else {
        console.error('Failed to add invoice');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, dateRaised, datePaid, creditCardNo, holdersName, expiryDate, registrationNo, pMethodNo } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="date" className="form-control" name="dateRaised" placeholder="Date Raised" value={dateRaised} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="date" className="form-control" name="datePaid" placeholder="Date Paid" value={datePaid} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="creditCardNo" placeholder="Credit Card Number" value={creditCardNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="holdersName" placeholder="Holder's Name" value={holdersName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="date" className="form-control" name="expiryDate" placeholder="Expiry Date" value={expiryDate} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="registrationNo" placeholder="Registration Number" value={registrationNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="pMethodNo" placeholder="Payment Method Number" value={pMethodNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
          <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
            Add New Invoice
          </button>
          <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
            View Invoices
          </button>
          <button className="button" style={{ width: "200px" }}>
            Update Invoice
          </button>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <InvoiceTable />
        </Modal>
      </div>
    );
  }
}

export default InvoiceForm;
