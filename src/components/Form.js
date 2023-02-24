 import React, { Component } from 'react';

export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact: "",
      relation:""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.name);
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      relation: this.state.relation
    };
    this.props.addUser(newUser)
    this.setState({
      name: "",
      email: "",
      contact: "",
      relation:""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
    
          <input type="text" class="form-control" name="name" placeholder="Company Name" value={this.state.name} onChange={this.handleChange} style={{width:"300px"}} /><br/>
    
          <input type="text" class="form-control" name="email" placeholder="Industry" value={this.state.email} onChange={this.handleChange} style={{width:"300px"}}/><br/>
        
          <input type="location" class="form-control" name="contact" placeholder="Location" value={this.state.contact} onChange={this.handleChange} style={{width:"300px"}} /><br/>
           
          <input type="date" class="form-control" name="relation" placeholder="" value={this.state.relation} onChange={this.handleChange} style={{width:"300px"}} /><br/>

        <div>
        <button class="button">
            Add startup
        </button>
        </div>
      </form>

     );
  }
}

