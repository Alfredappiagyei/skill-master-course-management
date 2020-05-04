import React, { Component } from "react";
import { connect } from 'react-redux';
import './test/css/bootstrap.min.css';
import { addUser, deleteUser } from './Store/Actions';
import { UserForm } from "./components/Form";
import User from './components/UserInfo'
import "./App.css";
import {

  BrowserRouter as Router,
  // Switch,
  // Route,
  Link

} from "react-router-dom";

export class App extends Component {


  addNewUser = newUser => {
    this.props.addUser(newUser)
  };


  deleteUser = user_id => {
    this.props.deleteUser(user_id);
  }

  render() {
    return (
      <div className="body">
        <div className="container-fluid">
          <div className="row" id="header">Contact Mannager</div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-12" style={{margin:"100px 0px", padding:"20px 0px 0px 40px", backgroundColor:"lightblue", borderRadius:"10px"}}>
            <UserForm addUser={this.addNewUser} />
            </div>
            <div className="col-md-8 col-xs-12" style={{backgroundColor:"lightblue", padding:"20px 0px 0px 40px", margin:"100px 0px 0px 0px",borderRadius:"10px"}}>
              <div className="row">
                <b style={{fontSize:"30px"}}>All Contacts</b><hr/>
              </div>
              <div className="row">
                    
            {this.props.users.map((people, index) => {
   return (
     <User

       key={people.id}
       id={people.id}
       name={people.name} 
       email={people.email}
       contact={people.contact}
       relation={people.relation}
       removeUser={this.deleteUser}
     />
   );
 })}
              </div>
       
            </div>
           

          </div>

        
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {
  addUser: addUser,
  deleteUser: deleteUser

}

export default connect(mapStateToProps, mapDispatchToProps)(App);



















// <div className="form-container">
// <UserForm addUser={this.addNewUser} />
// </div>

// <div className="users-container">
// {this.props.users.map((people, index) => {
//   return (
//     <User

//       key={people.id}
//       id={people.id}
//       name={people.name}
//       email={people.email}
//       contact={people.contact}
//       removeUser={this.deleteUser}
//     />
//   );
// })}
// </div>





