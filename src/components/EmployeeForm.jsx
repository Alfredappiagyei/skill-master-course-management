// UserForm.js
import React, { Component } from 'react';
import Modal from './Modal';
import EmployeeTable from '../Tables/EmployeeTable';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      employeeNo: '',
      employeeFName: '',
      employeeLName: '',
      employeeEmail: '',
      employeeContact: ''
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
    const { employeeNo, employeeFName, employeeLName, employeeEmail, employeeContact } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeNo, employeeFName, employeeLName, employeeEmail, employeeContact })
      });

      if (response.ok) {
        console.log('Employee added successfully');
        this.setState({ employeeNo: '', employeeFName: '', employeeLName: '', employeeEmail: '', employeeContact: '' });
      } else {
        console.error('Failed to add employee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, employeeNo, employeeFName, employeeLName, employeeEmail, employeeContact } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="employeeNo" placeholder="Employee Number" value={employeeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="employeeFName" placeholder="First Name" value={employeeFName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="employeeLName" placeholder="Last Name" value={employeeLName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="email" className="form-control" name="employeeEmail" placeholder="Email" value={employeeEmail} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="employeeContact" placeholder="Contact" value={employeeContact} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Employee
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Employees
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Employeee
           </button>
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <EmployeeTable />
        </Modal>
      </div>
    );
  }
}

export default EmployeeForm;
