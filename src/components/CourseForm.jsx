import React, { Component } from 'react';
import Modal from './Modal';
import CourseTable from '../Tables/CourseTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      courseTypeNo: '',
      errors: {},
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
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

    const errors = {};
    if (!courseName) errors.courseName = 'Course Name is required';
    if (!courseDescription) errors.courseDescription = 'Course Description is required';
    if (!startDate) errors.startDate = 'Start Date is required';
    if (!startTime) errors.startTime = 'Start Time is required';
    if (!endDate) errors.endDate = 'End Date is required';
    if (!endTime) errors.endTime = 'End Time is required';
    if (!maxDelegates) errors.maxDelegates = 'Max Delegates is required';
    if (!confirmed) errors.confirmed = 'Confirmation status is required';
    if (!delivererEmployeeNo) errors.delivererEmployeeNo = 'Deliverer Employee No is required';
    if (!courseTypeNo) errors.courseTypeNo = 'Course Type No is required';
    
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

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

      const result = await response.json();

      if (response.ok) {
        toast.success('Course added successfully');
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
          courseTypeNo: '',
          errors: {}
        });
      } else {
        const errorMessage = result.error;
        if (errorMessage.includes('Employee number does not exist')) {
          toast.error('Employee number does not exist. Enter an already existing deliverer employee number.');
        } else if (errorMessage.includes('Course type number does not exist')) {
          toast.error('Course type number does not exist. Enter an already existing course type number.');
        } else if (errorMessage.includes('The selected employee is already assigned')) {
          toast.error('Employee is already assigned a different course. Enter a different employee number.');
        } else {
          toast.error('Failed to add course. Please check the details and try again.');
        }
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (courseNo) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/courses/${courseNo}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Course deleted successfully');
          // Refresh the course list or handle the state update accordingly
        } else {
          toast.error('Failed to delete course');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { 
      showModal, 
      courseName, 
      courseDescription, 
      startDate, 
      startTime, 
      endDate, 
      endTime, 
      maxDelegates, 
      confirmed, 
      delivererEmployeeNo, 
      courseTypeNo,
      errors 
    } = this.state;

    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='courseName'>Course Name</label>
              <input
                type='text'
                className='form-control'
                id='courseName'
                name='courseName'
                placeholder='Course Name'
                value={courseName}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseName && <span className='error'>{errors.courseName}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='courseDescription'>Course Description</label>
              <input
                type='text'
                className='form-control'
                id='courseDescription'
                name='courseDescription'
                placeholder='Course Description'
                value={courseDescription}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseDescription && <span className='error'>{errors.courseDescription}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='startDate'>Start Date</label>
              <input
                type='date'
                className='form-control'
                id='startDate'
                name='startDate'
                placeholder='Start Date'
                value={startDate}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.startDate && <span className='error'>{errors.startDate}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='startTime'>Start Time</label>
              <input
                type='time'
                className='form-control'
                id='startTime'
                name='startTime'
                placeholder='Start Time'
                value={startTime}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.startTime && <span className='error'>{errors.startTime}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='endDate'>End Date</label>
              <input
                type='date'
                className='form-control'
                id='endDate'
                name='endDate'
                placeholder='End Date'
                value={endDate}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.endDate && <span className='error'>{errors.endDate}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='endTime'>End Time</label>
              <input
                type='time'
                className='form-control'
                id='endTime'
                name='endTime'
                placeholder='End Time'
                value={endTime}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.endTime && <span className='error'>{errors.endTime}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='maxDelegates'>Max Delegates</label>
              <input
                type='number'
                className='form-control'
                id='maxDelegates'
                name='maxDelegates'
                placeholder='Max Delegates'
                value={maxDelegates}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.maxDelegates && <span className='error'>{errors.maxDelegates}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='confirmed'>Confirmed</label>
              <input
                type='text'
                className='form-control'
                id='confirmed'
                name='confirmed'
                placeholder='Confirmed'
                value={confirmed}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.confirmed && <span className='error'>{errors.confirmed}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='delivererEmployeeNo'>Deliverer Employee No</label>
              <input
                type='number'
                className='form-control'
                id='delivererEmployeeNo'
                name='delivererEmployeeNo'
                placeholder='Deliverer Employee No'
                value={delivererEmployeeNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.delivererEmployeeNo && <span className='error'>{errors.delivererEmployeeNo}</span>}
            </div>
            <div className='form-group'>
              <label htmlFor='courseTypeNo'>Course Type No</label>
              <input
                type='number'
                className='form-control'
                id='courseTypeNo'
                name='courseTypeNo'
                placeholder='Course Type No'
                value={courseTypeNo}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseTypeNo && <span className='error'>{errors.courseTypeNo}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }}>
                Add New Course
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '200px' }}
                onClick={this.toggleModal}
              >
                View Courses
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default CourseForm;
