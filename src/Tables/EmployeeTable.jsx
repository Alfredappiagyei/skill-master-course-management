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
      const response = await fetch(`http://localhost:3001/api/employees/${editEmployee.EMPLOYEENO}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editEmployee),
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployees(
          employees.map((emp) => (emp.EMPLOYEENO === updatedEmployee.EMPLOYEENO ? updatedEmployee : emp))
        );
        setEditEmployee(null);
        console.log('Employee updated successfully:', updatedEmployee);
      } else {
        console.error('Failed to update employee');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="table">
      <div className="all-startups">
        <div className="all"><h4>All Employees</h4></div>
      </div>
      <section style={{ width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Employee Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.EMPLOYEENO}</td>
                <td>{employee.EMPLOYEEFNAME}</td>
                <td>{employee.EMPLOYEELNAME}</td>
                <td>{employee.EMPLOYEEEMAIL}</td>
                <td>{employee.EMPLOYEECONTACT}</td>
                <td>
                  <button onClick={() => handleUpdate(employee)}>Update</button>
                  <button onClick={() => handleDelete(employee.EMPLOYEENO)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  );
}
