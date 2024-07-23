import React, { Component } from 'react';
import Modal from './Modal';
import CourseTypesTable from '../Tables/CourseTypesTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CourseTypesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      courseTypeDescription: '',
      errors: {}
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateForm = () => {
    const { courseTypeDescription } = this.state;
    const errors = {};

    if (!courseTypeDescription) errors.courseTypeDescription = 'Course Type Description is required';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (!this.validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const { courseTypeDescription } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/courseTypes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseTypeDescription })
      });

      if (response.ok) {
        toast.success('Course type added successfully');
        this.setState({ courseTypeDescription: '', errors: {} });
      } else {
        const errorResponse = await response.json();
        toast.error('Failed to add course type');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    }
  };

  handleDelete = async (courseTypeId) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/courseTypes/${courseTypeId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Course type deleted successfully');
          // Refresh the course types list or handle the state update accordingly
        } else {
          toast.error('Failed to delete course type');
        }
      } catch (err) {
        toast.error('Error: ' + err.message);
      }
    }
  };

  render() {
    const { showModal, courseTypeDescription, errors } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <ToastContainer />
        <div className='form-container'>
          <form onSubmit={this.handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div className='form-group'>
              <label htmlFor='courseTypeDescription'>Course Type Description</label>
              <input
                type='text'
                className='form-control'
                id='courseTypeDescription'
                name='courseTypeDescription'
                placeholder='Course Type Description'
                value={courseTypeDescription}
                onChange={this.handleChange}
                style={{ width: '300px' }}
              />
              {errors.courseTypeDescription && <span className='error'>{errors.courseTypeDescription}</span>}
            </div>
            <div className='form-group'>
              <button className='button' type='submit' style={{ width: '200px' }}>
                Add New Course Type
              </button>
              <button
                className='button'
                type='button'
                style={{ width: '200px' }}
                onClick={this.toggleModal}
              >
                View Course Types
              </button>
            </div>
          </form>
        </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <CourseTypesTable onDelete={this.handleDelete} />
        </Modal>
      </div>
    );
  }
}

export default CourseTypesForm;
