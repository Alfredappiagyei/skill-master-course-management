import React, { Component } from "react";
import { connect } from 'react-redux';
import './test/css/bootstrap.min.css';
import { addUser, deleteUser } from './Store/Actions';
import { UserForm } from "./components/Form";
import User from './components/UserInfo'
import "./App.css";
import  {Link}  from "react-router-dom";
 
export class App extends Component {

  addNewUser = newUser => {
    this.props.addUser(newUser)
  };
 
  deleteUser = user_id => {
    this.props.deleteUser(user_id);
  }

  render() {
    return (
      
      <div className="dashboard">
      <div className="nav">
      <span class="glyphicon glyphicon-cog"><b>dashboard</b></span>

        <div class="dropdown">
          <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Add Startup
          <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a>Dashboard</a></li>
            <li> <Link to ="/form" style={{color:"black"}}>Add Startup</Link></li>
            <li><a>Startup Details</a></li>
          </ul>
        </div>
      </div>


        <div className="container-fluid">
        <input type="text" id="search1" class="form-control" placeholder="Dashboard" />
          <div className="row">
            <div className="col-md-3 col-xs-12">
            <div className="section1">
              <div className="control-startup">
               <Link to ="/form" style={{color:"black"}}><span class="glyphicon glyphicon-cog">Dashboard</span></Link>
              </div>
              <div className="control-startup">
              <Link to ="/form" style={{color:"black"}}><span class="glyphicon glyphicon-plus">Add Startup</span></Link>
              
              </div>
              <div className="control-startup">
              <Link to ="/form" style={{color:"black"}}><span class="glyphicon glyphicon-file">Satrtup Details</span></Link>
              </div>
            </div>

            <div className="section2" style={{marginTop:"50px"}}>
            <UserForm addUser={this.addNewUser} />
            </div>
            </div>














            <div className="col-md-9 col-xs-12">
              <div className="row">
                
            <div className="all-startups">
              <div className="all"><h4>All Startups</h4></div>
            </div>
           

            <section  style={{width:"100%"}} >
              <input type="text" id="search2" class="form-control" placeholder="Dashboard" />
              
               
               <div className="row" style={{width:"100%"}}>
                 <div className="col-md-3"  style={{ paddingRight:"100px"}}><b>Company</b></div>
                 <div className="col-md-2" ><b>Marketing/Industry</b></div>
                 <div className="col-md-2"><b>Location</b></div>
                 <div className="col-md-2"> <b>Joined</b></div>
                 <div className="col-md-1"> <b>Approved</b></div>
                 <div className="col-md-1"><b>Action</b></div>
               </div>
               <hr/>


            
                
                   <div className="row" style={{width:"100%", marginLeft:"1px" }}>
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
                   
                            
                          
              

            </section>

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



