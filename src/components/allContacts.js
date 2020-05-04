import React, { Component } from 'react';
import { addUser, deleteUser} from './Store/Actions';
import User from './components/UserInfo' ;


export class Allcontacts extends Component {
  render() {

    
  addNewUser = newUser => {
    this.props.addUser(newUser)
  };


deleteUser = user_id => {
  this.props.deleteUser(user_id);
}


const mapDispatchToProps = {
    addUser: addUser,
    deleteUser: deleteUser
  
  } 

    return (
     
        <div>
            <div className="container">
            // {this.props.users.map((people, index) => {
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
        
    );
  }
}

