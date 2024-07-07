import React, { Component } from 'react';
import Modal from './Modal';
import LocationsTable from '../Tables/LocationsTable';

class LocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      locationName: '',
      locationMaxSize: ''
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
    const { locationName, locationMaxSize } = this.state;

    try {
      const response = await fetch('http://localhost:3001/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName, locationMaxSize })
      });

      if (response.ok) {
        console.log('Location added successfully');
        this.setState({ locationName: '', locationMaxSize: '' });
      } else {
        console.error('Failed to add location');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  render() {
    const { showModal, locationName, locationMaxSize } = this.state;
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <input type="text" className="form-control" name="locationName" placeholder="Location Name" value={locationName} onChange={this.handleChange} style={{ width: "300px" }} /><br />
            <input type="number" className="form-control" name="locationMaxSize" placeholder="Max Size" value={locationMaxSize} onChange={this.handleChange} style={{ width: "300px" }} /><br />
          </form>
        </div>

        <div className='col-md-6' style={{ display: "flex", flexWrap: "wrap", alignItems: "center", textAlign: "center", gap: 10 }}>
           <button className="button" style={{ width: "200px" }} onClick={this.handleSubmit}>
             Add New Location
           </button>
           <button className="button" style={{ width: "200px" }} onClick={this.toggleModal}>
             View Locations
           </button>
           <button className="button" style={{ width: "200px" }}>
             Update Location
           </button>
         </div>

        <Modal show={showModal} handleClose={this.toggleModal}>
          <LocationsTable />
        </Modal>
      </div>
    );
  }
}

export default LocationForm;
