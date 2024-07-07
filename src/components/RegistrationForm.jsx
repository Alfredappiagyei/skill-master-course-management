import React, { Component } from 'react';
import Modal from './Modal';
import RegistrationTable from '../Tables/RegistrationTable';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      registrationDate: '',
      delegateNo: '',
      courseFeeNo: '',
      registerEmployeeNo: '',
      courseNo: ''
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
    const { registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo })
      });

      if (response.ok) {
        console.log('Registration added successfully');
        this.setState({ registrationDate: '', delegateNo: '', courseFeeNo: '', registerEmployeeNo: '', courseNo: '' });
      } else {
        console.error('Failed to add registration');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, registrationDate, delegateNo, courseFeeNo, registerEmployeeNo, courseNo } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="date" className="form-control" name="registrationDate" placeholder="Registration Date" value={registrationDate} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="delegateNo" placeholder="Delegate Number" value={delegateNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="courseFeeNo" placeholder="Course Fee Number" value={courseFeeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="registerEmployeeNo" placeholder="Register Employee Number" value={registerEmployeeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="courseNo" placeholder="Course Number" value={courseNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ fontSize: "10px",width: "200px" }} onClick={this.handleSubmit}>
             Add New Registration
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Registrations
           </button>
           <button className="button" style={{fontSize: "10px", width: "200px" }}>
             Update Registration
           </button>
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <RegistrationTable />
        </Modal>
      </div>
    );
  }
}

export default RegistrationForm;
