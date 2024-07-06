import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", backgroundColor:"#304463", height:"100vh", width:"100%", paddingLeft:20}}>       
      <Link to="/home" style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-home"></span> <p style={{fontWeight:"bold"}}>Home</p></Link>
      <Link to="/employees"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-user"></span><p style={{fontWeight:"bold"}}>Employees</p></Link>
      <Link to="/client"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-bookmark"></span><p style={{fontWeight:"bold"}}>Clients</p></Link>
      <Link to="/delegate"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-asterisk"></span><p style={{fontWeight:"bold"}}>Delegates</p></Link>
      <Link to="/coursetypes"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-pencil"></span><p style={{fontWeight:"bold"}}>Course Types</p></Link>
      <Link to="/course"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-book"></span><p style={{fontWeight:"bold"}}>Courses</p></Link>
      <Link to="/coursefee"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-euro"></span><p style={{fontWeight:"bold"}}>Course Fees</p></Link>
      <Link to="/paymentmethod"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-credit-card"></span><p style={{fontWeight:"bold"}}>Payment Methods</p></Link>
      <Link to="/location"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-globe"></span><p style={{fontWeight:"bold"}}>Locations</p></Link>
      <Link to="/registration"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-level-up"></span><p style={{fontWeight:"bold"}}>Registrations</p></Link>
      <Link to="/invoices"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-file"></span><p style={{fontWeight:"bold"}}>Invoices</p></Link>
      <Link to="/booking"  style={{ color: "#fff", display:"flex", gap:25, textDecoration:"none" }}><span className="glyphicon glyphicon-saved"></span><p style={{fontWeight:"bold"}}>Bookings</p></Link>
    </div>
  )
}
