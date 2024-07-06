require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addEmployee(employee) {
  let con;

  // Validate input
  if (!employee.employeeFName || !employee.employeeLName || !employee.employeeEmail || !employee.employeeContact) {
    const missingFields = [];
    if (!employee.employeeFName) missingFields.push('employeeFName');
    if (!employee.employeeLName) missingFields.push('employeeLName');
    if (!employee.employeeEmail) missingFields.push('employeeEmail');
    if (!employee.employeeContact) missingFields.push('employeeContact');

    const errorMessage = `Error: Missing required fields: ${missingFields.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         new_employee(:employeeFName, :employeeLName, :employeeEmail, :employeeContact, :newEmployeeNo);
       END;`,
      {
        employeeFName: employee.employeeFName,
        employeeLName: employee.employeeLName,
        employeeEmail: employee.employeeEmail,
        employeeContact: employee.employeeContact,
        newEmployeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newEmployeeNo = result.outBinds.newEmployeeNo[0];
    console.log(`Employee added successfully with ID: ${newEmployeeNo}`);

    return newEmployeeNo; // Return the generated employeeNo if needed
  } catch (err) {
    console.error('Error inserting employee:', err);
    throw err;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}

module.exports = { addEmployee };
