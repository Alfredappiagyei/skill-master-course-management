import React, { Component } from 'react';
import Modal from './Modal';
import CourseTable from '../Tables/CourseTable';

class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      courseName: '',
      courseDescription: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      maxDelegates: '',
      confirmed: '',
      delivererEmployeeNo: '',
      courseTypeNo: ''
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
      courseName, 
      courseDescription, 
      startDate, 
      startTime, 
      endDate, 
      endTime, 
      maxDelegates, 
      confirmed, 
      delivererEmployeeNo, 
      courseTypeNo 
    } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          courseName, 
          courseDescription, 
          startDate, 
          startTime, 
          endDate, 
          endTime, 
          maxDelegates, 
          confirmed, 
          delivererEmployeeNo, 
          courseTypeNo 
        })
      });

      if (response.ok) {
        console.log('Course added successfully');
        this.setState({ 
          courseName: '', 
          courseDescription: '', 
          startDate: '', 
          startTime: '', 
          endDate: '', 
          endTime: '', 
          maxDelegates: '', 
          confirmed: '', 
          delivererEmployeeNo: '', 
          courseTypeNo: '' 
        });
      } else {
        console.error('Failed to add course');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, courseName, courseDescription, startDate, startTime, endDate, endTime, maxDelegates, confirmed, delivererEmployeeNo, courseTypeNo } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="courseName" placeholder="Course Name" value={courseName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="courseDescription" placeholder="Course Description" value={courseDescription} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="date" className="form-control" name="startDate" placeholder="Start Date" value={startDate} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="time" className="form-control" name="startTime" placeholder="Start Time" value={startTime} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="date" className="form-control" name="endDate" placeholder="End Date" value={endDate} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="time" className="form-control" name="endTime" placeholder="End Time" value={endTime} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="maxDelegates" placeholder="Max Delegates" value={maxDelegates} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="text" className="form-control" name="confirmed" placeholder="Confirmed" value={confirmed} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="delivererEmployeeNo" placeholder="Deliverer Employee No" value={delivererEmployeeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="courseTypeNo" placeholder="Course Type No" value={courseTypeNo} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Course
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Courses
           </button>
       
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseTable />
        </Modal>
      </div>
    );
  }
}

export default CourseForm;
