// ClientForm.js
import React, { Component } from 'react';
import Modal from './Modal';
import ClientTable from '../Tables/ClientTable';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      clientName: '',
      clientEmail: '',
      clientContact: ''
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
    const { clientName, clientEmail, clientContact } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, clientEmail, clientContact })
      });

      if (response.ok) {
        console.log('Client added successfully');
        this.setState({ clientName: '', clientEmail: '', clientContact: '' });
      } else {
        console.error('Failed to add client');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, clientName, clientEmail, clientContact } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="clientName" placeholder="Client Name" value={clientName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="email" className="form-control" name="clientEmail" placeholder="Email" value={clientEmail} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="clientContact" placeholder="Contact" value={clientContact} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Client
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Clients
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Client
           </button>
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <ClientTable />
        </Modal>
      </div>
    );
  }
}

export default ClientForm;
