import React, { Component } from 'react';
import Modal from './Modal';
import EmployeeTable from '../Tables/EmployeeTable';

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      employeeFName: '',
      employeeLName: '',
      employeeEmail: '',
      employeeContact: '',
      isLoading: false // New state variable
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
    const { employeeFName, employeeLName, employeeEmail, employeeContact } = this.state;

    // Set loading to true when submission starts
    this.setState({ isLoading: true });

    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeFName, employeeLName, employeeEmail, employeeContact })
      });

      if (response.ok) {
        console.log('Employee added successfully');
        this.setState({ 
          employeeFName: '', 
          employeeLName: '', 
          employeeEmail: '', 
          employeeContact: '' 
        });
      } else {
        console.error('Failed to add employee');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      // Set loading to false when submission ends
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { showModal, employeeFName, employeeLName, employeeEmail, employeeContact, isLoading } = this.state;

    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="employeeFName" placeholder="First Name" value={employeeFName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="employeeLName" placeholder="Last Name" value={employeeLName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="email" className="form-control" name="employeeEmail" placeholder="Email" value={employeeEmail} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="employeeContact" placeholder="Contact" value={employeeContact} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit} disabled={isLoading}>
             {isLoading ? 'Adding...' : 'Add New Employee'}
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Employees
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Employee
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
