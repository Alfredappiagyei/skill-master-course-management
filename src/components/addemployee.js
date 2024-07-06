const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addEmployee(employee) {
  let con;

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

