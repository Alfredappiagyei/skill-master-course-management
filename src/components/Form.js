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
    
          <input type="text" class="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} style={{width:"300px"}} /><br/>
    
          <input type="email" class="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} style={{width:"300px"}}/><br/>
        
          <input type="number" class="form-control" name="contact" placeholder="Contact Number" value={this.state.contact} onChange={this.handleChange} style={{width:"300px"}} /><br/>
           
          <input type="text" class="form-control" name="relation" placeholder="Relation" value={this.state.relation} onChange={this.handleChange} style={{width:"300px"}} /><br/>

          <p>Relation:</p>

          
        <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/> Family
        </label>
        <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/> Friend
        </label>
        <label class="radio-inline">
        <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/> Customer
       </label>

        <div>
          <button  style={{margin:"50px 100px 35px 100px",}}><b>Add Contact</b></button>
        </div>
      </form>

     );
  }
}

