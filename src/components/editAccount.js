import React, { Component } from 'react';
import { connect } from 'react-redux';
import {editUser} from '../Store/Actions';
import  {Link}  from "react-router-dom";
//  import { UserForm } from "./components/Form";

 class Editform extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: props.user.name,
        email: props.user.email,
        contact: props.user.contact,
        relation: props.user.relation
    };
    this.id = props.match.params.id
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const updatedInfo = {
      name: this.state.name,
      email: this.state.email,
      contact: this.state.contact,
      relation: this.state.relation
    
    };
    this.props.editUser(this.id, updatedInfo) 
        this.setState({
          name:'',
          email:'',
          contact:'',
          relation:''
        });

        this.props.history.push('/');
      };

  render() {
    return (

      <div className="container">
        <p> <Link to="/"><span style={{fontSize:"20px"}} class="glyphicon glyphicon-fast-backward"></span></Link></p>
        <div className="row"  style={{display:"block",  textAlign:"center", backgroundColor:"lightblue",   borderRadius:"10px",   }}>
        <form onSubmit={this.handleSubmit}   style={{display:"inline-block",   textAlign:"left", margin:"50px 0px 0px 0px"}}  >
         <input type="text" class="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} style={{width:"300px"}} /><br/>
    
        <input type="text" class="form-control" name="Industry" placeholder="Email" value={this.state.email} onChange={this.handleChange} style={{width:"300px"}}/><br/>
  
        <input type="Location" class="form-control" name="contact" placeholder="Location" value={this.state.contact} onChange={this.handleChange} style={{width:"300px"}} /><br/>
     
        <input type="date" class="form-control" name="relation" placeholder="" value={this.state.relation} onChange={this.handleChange} style={{width:"300px"}} /><br/>

        <div>
          <button style={{margin:"50px 100px",}} type="submit" ><b>Apdate User</b></button>
        </div>
      </form>
          
        </div>
      </div>
      
    
      

    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    user: state.users.find(user => user.id === ownProps.match.params.id)
    });
    
    const mapDispatchToProps = {
      editUser: editUser
    }

    export default  connect(mapStateToProps, mapDispatchToProps)(Editform);