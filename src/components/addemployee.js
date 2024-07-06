const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addEmployee(employee) {
  let con;

  // Validate input
  if (!employee.employeeNo || !employee.employeeFName || !employee.employeeLName || !employee.employeeEmail || !employee.employeeContact) {
    const missingFields = [];
    if (!employee.employeeNo) missingFields.push('employeeNo');
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
      user: "system",
      password: "oracleE",
      connectString: "encarta:1522/xepdb1"
    });

    await con.execute(
      `BEGIN 
         new_employee(:employeeNo, :employeeFName, :employeeLName, :employeeEmail, :employeeContact);
       END;`,
      {
        employeeNo: employee.employeeNo,
        employeeFName: employee.employeeFName,
        employeeLName: employee.employeeLName,
        employeeEmail: employee.employeeEmail,
        employeeContact: employee.employeeContact
      },
      { autoCommit: true }
    );
    console.log('Employee added successfully');
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
