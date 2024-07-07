import React, { useState, useEffect } from 'react';

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleViewEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    handleViewEmployees();
  }, []);

  const handleDelete = async (employeeNo) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeNo}`, { method: 'DELETE' });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.EMPLOYEENO !== employeeNo));
        console.log('Employee deleted successfully');
      } else {
        console.error('Failed to delete employee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleUpdate = (employee) => {
    setEditEmployee(employee);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating employee:', editEmployee); // Check if editEmployee has the updated values
  
      const response = await fetch(`http://localhost:3001/api/employees/${editEmployee.EMPLOYEENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEmployee),
      });
  
      if (response.ok) {
        const updatedEmployee = await response.json(); // Assuming the API returns the updated employee
        console.log('Employee updated successfully:', updatedEmployee); // Log updated employee details
  
        // Update the employees state to reflect the changes
        setEmployees(employees.map((emp) => (emp.EMPLOYEENO === updatedEmployee.EMPLOYEENO ? updatedEmployee : emp)));
        setEditEmployee(null); // Reset editEmployee state after successful update
      } else {
        console.error('Failed to update employee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  

  return (
    <div className="table">
      <div className="row">
        <div className="all-startups">
          <div className="all"><h4>All Employees</h4></div>
        </div>
        <section style={{ width: '100%' }}>
          <input type="text" id="search2" className="form-control" placeholder="Dashboard" />
          <div className="row" style={{ width: '100%' }}>
            <div className="col-md-2" style={{ paddingRight: '100px' }}><b>Employee Number</b></div>
            <div className="col-md-2"><b>First Name</b></div>
            <div className="col-md-2"><b>Last Name</b></div>
            <div className="col-md-2"><b>Email</b></div>
            <div className="col-md-2"><b>Contact</b></div>
            <div className="col-md-2"><b>Actions</b></div>
          </div>
          <hr />
          <div className="row" style={{ width: '100%', marginLeft: '1px' }}>
            {employees.map((employee, index) => (
              <div key={index} className="row" style={{ width: '100%' }}>
                <div className="col-md-2">{employee.EMPLOYEENO}</div>
                <div className="col-md-2">{employee.EMPLOYEEFNAME}</div>
                <div className="col-md-2">{employee.EMPLOYEELNAME}</div>
                <div className="col-md-2">{employee.EMPLOYEEEMAIL}</div>
                <div className="col-md-2">{employee.EMPLOYEECONTACT}</div>
                <div className="col-md-2">
                  <button onClick={() => handleUpdate(employee)}>Update</button>
                  <button onClick={() => handleDelete(employee.EMPLOYEENO)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
          {editEmployee && (
            <form onSubmit={handleFormSubmit}>
              <h3>Edit Employee</h3>
              <label>
                First Name:
                <input type="text" name="EMPLOYEEFNAME" value={editEmployee.EMPLOYEEFNAME} onChange={handleFormChange} />
              </label>
              <label>
                Last Name:
                <input type="text" name="EMPLOYEELNAME" value={editEmployee.EMPLOYEELNAME} onChange={handleFormChange} />
              </label>
              <label>
                Email:
                <input type="email" name="EMPLOYEEEMAIL" value={editEmployee.EMPLOYEEEMAIL} onChange={handleFormChange} />
              </label>
              <label>
                Contact:
                <input type="text" name="EMPLOYEECONTACT" value={editEmployee.EMPLOYEECONTACT} onChange={handleFormChange} />
              </label>
              <button type="submit">Update</button>
              <button type="button" onClick={() => setEditEmployee(null)}>Cancel</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
