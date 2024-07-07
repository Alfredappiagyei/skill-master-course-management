import React, { Component } from 'react';
import Modal from './Modal';
import PaymentTable from '../Tables/PaymentTable';

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      pMethodName: ''
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
    const { pMethodName } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/paymentMethods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pMethodName })
      });

      if (response.ok) {
        console.log('Payment method added successfully');
        this.setState({ pMethodName: '' });
      } else {
        console.error('Failed to add payment method');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, pMethodName } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="pMethodName" placeholder="Payment Method Name" value={pMethodName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ fontSize: "10px",width: "200px" }} onClick={this.handleSubmit}>
             Add New Payment Method
           </button>
           <button className="button" style={{ fontSize: "10px",width: "200px" }} onClick={this.toggleModal}>
             View Payment Methods
           </button>
           <button className="button" style={{ fontSize: "10px",width: "200px" }}>
             Update Payment Method
           </button>
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <PaymentTable />
        </Modal>
      </div>
    );
  }
}

export default PaymentForm;
