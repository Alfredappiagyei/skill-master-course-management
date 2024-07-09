import React, { Component } from 'react';
import Modal from './Modal';
import CourseFeeTable from '../Tables/CourseFeeTable';

class CourseFeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      feeDescription: '',
      fee: '',
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
    const { feeDescription, fee, courseNo } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/courseFees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feeDescription, fee, courseNo })
      });

      if (response.ok) {
        console.log('Course fee added successfully');
        this.setState({ feeDescription: '', fee: '', courseNo: '' });
      } else {
        console.error('Failed to add course fee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, feeDescription, fee, courseNo } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="feeDescription" placeholder="Fee Description" value={feeDescription} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="fee" placeholder="Fee" value={fee} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="courseNo" placeholder="Course No" value={courseNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px", fontSize: "10px" }} onClick={this.handleSubmit}>
             Add New Course Fee
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Course Fees
           </button>
         
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseFeeTable />
        </Modal>
      </div>
    );
  }
}

export default CourseFeeForm;
