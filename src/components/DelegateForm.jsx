// DelegateForm.js
import React, { Component } from 'react';
import Modal from './Modal';
import DelegateTable from '../Tables/DelegateTable';

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
      clientNo: ''
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
    const {
      delegateTitle, delegateFName, delegateLName, delegateStreet,
      delegateCity, delegateState, delegateZipCode, attTelNo,
      attFaxNo, attEmailAddress, clientNo
    } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/delegates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          delegateTitle, delegateFName, delegateLName, delegateStreet,
          delegateCity, delegateState, delegateZipCode, attTelNo,
          attFaxNo, attEmailAddress, clientNo
        })
      });

      if (response.ok) {
        console.log('Delegate added successfully');
        this.setState({
          delegateTitle: '', delegateFName: '', delegateLName: '', delegateStreet: '',
          delegateCity: '', delegateState: '', delegateZipCode: '', attTelNo: '',
          attFaxNo: '', attEmailAddress: '', clientNo: ''
        });
      } else {
        console.error('Failed to add delegate');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const {
      showModal, delegateTitle, delegateFName, delegateLName, delegateStreet,
      delegateCity, delegateState, delegateZipCode, attTelNo, attFaxNo,
      attEmailAddress, clientNo
    } = this.state;

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="delegateTitle" placeholder="Title" value={delegateTitle} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateFName" placeholder="First Name" value={delegateFName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateLName" placeholder="Last Name" value={delegateLName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateStreet" placeholder="Street" value={delegateStreet} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateCity" placeholder="City" value={delegateCity} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateState" placeholder="State" value={delegateState} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="delegateZipCode" placeholder="Zip Code" value={delegateZipCode} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="tel" className="form-control" name="attTelNo" placeholder="Tel Number" value={attTelNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="tel" className="form-control" name="attFaxNo" placeholder="Fax Number" value={attFaxNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="email" className="form-control" name="attEmailAddress" placeholder="Email Address" value={attEmailAddress} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="clientNo" placeholder="Client Number" value={clientNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Delegate
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Delegates
           </button>
        
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <DelegateTable />
        </Modal>
      </div>
    );
  }
}

export default DelegateForm;
