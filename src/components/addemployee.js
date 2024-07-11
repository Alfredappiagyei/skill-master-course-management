require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addEmployee(employee) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         new_employee(:in_employeeFName, :in_employeeLName, :in_employeeEmail, :in_employeeContact, :out_newEmployeeNo, :out_error_message);
       END;`,
      {
        in_employeeFName: employee.employeeFName,
        in_employeeLName: employee.employeeLName,
        in_employeeEmail: employee.employeeEmail,
        in_employeeContact: employee.employeeContact,
        out_newEmployeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }
    );

    // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting employee:', errorMessage);
      throw new Error(errorMessage);
    }

    // If no error, retrieve the generated employeeNo
    const newEmployeeNo = result.outBinds.out_newEmployeeNo[0];
    console.log(`Employee added successfully with ID: ${newEmployeeNo}`);

    return newEmployeeNo; // Return the generated employeeNo if needed
  } catch (err) {
    // does not do anything. just so the code doesnot break. originally has 
    // to throw some error but shows too much info i dont want that
    if (errorMessage) {
      console.error('Error inserting employee:', errorMessage);
      throw new Error(errorMessage);
    }
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
