require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getEmployees() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_employee_details(:cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      }
    );

    const resultSet = result.outBinds.cursor;
    const rows = [];

    let row;
    while ((row = await resultSet.getRow())) {
      rows.push(row);
    }

    await resultSet.close();
    return rows;
  } catch (err) {
    console.error('Error fetching employees:', err);
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

async function deleteEmployee(employeeNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_employee(:employeeNo);
       END;`,
      {
        employeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: employeeNo },
        
      }
    );

    console.log('Employee deleted successfully');
  } catch (err) {
    if (err.errorNum === 20001) {
      console.error('Cannot delete employee due to related records.');
    } else {
      console.error('Error deleting employee:', err);
    }    throw err;
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

async function updateEmployee(employeeNo, employeeDetails) {
  console.log('Updating employee with employeeNo:', employeeNo);
  console.log('Employee details:', employeeDetails);

  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         update_employee(
           :employeeNo,
           :employeeFName,
           :employeeLName,
           :employeeEmail,
           :employeeContact
         );
       END;`,
      {
        employeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: employeeNo },
        employeeFName: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: employeeDetails.EMPLOYEEFNAME },
        employeeLName: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: employeeDetails.EMPLOYEELNAME },
        employeeEmail: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: employeeDetails.EMPLOYEEEMAIL },
        employeeContact: { type: oracledb.STRING, dir: oracledb.BIND_IN, val: employeeDetails.EMPLOYEECONTACT }
      }
    );

    await con.commit();
    console.log('Employee updated successfully');
  } catch (err) {
    console.error('Error updating employee:', err);
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



module.exports = { getEmployees, deleteEmployee, updateEmployee };
