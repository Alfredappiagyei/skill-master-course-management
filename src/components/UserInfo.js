import React from 'react';
import  {Link}  from "react-router-dom";

const User = ({ name, email, contact, id, relation, removeUser, }) => {
    const handleClick = () =>{
          removeUser(id)
    }
    return (
        <div>
            <h4><b>{name}</b> </h4>
            <p ><b>{email}</b> </p>
            <p ><b>{contact}</b> </p>
            <p ><b>{relation}</b> </p>
            <span  onClick={handleClick} style={{color:"red", fontSize:"20px",}} class="glyphicon glyphicon-trash"></span>
            <Link to = {`/edit/${id}`}><span style={{fontSize:"20px"}} class="glyphicon glyphicon-edit"></span></Link>
            <hr/>

        </div>
    );
}

export default User;