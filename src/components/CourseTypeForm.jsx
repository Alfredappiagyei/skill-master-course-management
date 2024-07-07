import React, { Component } from 'react';
import Modal from './Modal';
import CourseTypesTable from '../Tables/CourseTypesTable';

class CourseTypesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      courseTypeDescription: ''
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
    const { courseTypeDescription } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/courseTypes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTypeDescription })
      });

      if (response.ok) {
        console.log('Course type added successfully');
        this.setState({ courseTypeDescription: '' });
      } else {
        console.error('Failed to add course type');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, courseTypeDescription } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
          <input type="text" className="form-control" name="courseTypeDescription" placeholder="Course Type Description" value={courseTypeDescription} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ fontSize: "10px",width: "200px" }} onClick={this.handleSubmit}>
             Add New Course Type
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Course Types
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Course Type
           </button>
         </div>


        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseTypesTable />
        </Modal>
      </div>
    );
  }
}

export default CourseTypesForm;
