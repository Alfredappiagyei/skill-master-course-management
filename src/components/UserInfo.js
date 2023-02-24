import React from 'react';
import  {Link}  from "react-router-dom";


const User = ({ name, email, contact, id, relation, removeUser, }) => {
    const handleClick = () =>{
          removeUser(id)
    }
    return (
        <div >
          <div className="row" style={{width:"100%"}}>
            <div className="col-md-3"> <span><img style={{ padding: "22px", background: "grey" }}></img>{name}</span></div>
            <div className="col-md-2"><p>{email}</p></div>
            <div className="col-md-2">{contact}</div>
            <div className="col-md-2">{relation}</div>
            <div className="col-md-1">
                       <button style={{ padding: "8px 12px", background: "green", color: "#fff", borderRadius: "5px", marginRight: "2px", border: "none" }}>
                        <input id="check" type="checkbox" style={{ background: "green" }} checked />
                       </button>
                       
            </div>
            <div className="col-md-2">
            <button style={{ padding: "8px 12px", background: "blue", color: "#fff", borderRadius: "5px", marginRight: "2px", border: "none" }}>
                      <Link to = {`/edit/${id}`}><span class="glyphicon glyphicon-edit"></span></Link>
                      </button>

                      <button  onClick={handleClick} style={{ padding: "8px 12px", background: "red", color: "#fff", borderRadius: "5px", border: "none" }}>
                      <span class="glyphicon glyphicon-trash"></span>
                      </button><hr/>
            </div>
          </div>
           
                      
         </div>   
                                    
    );
}

export default User;