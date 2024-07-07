require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addRegistration(registration) {
  let con;

  // Validate input
  if (!registration.registrationDate || !registration.delegateNo || !registration.courseFeeNo || !registration.registerEmployeeNo || !registration.courseNo) {
    const missingFields = [];
    if (!registration.registrationDate) missingFields.push('registrationDate');
    if (!registration.delegateNo) missingFields.push('delegateNo');
    if (!registration.courseFeeNo) missingFields.push('courseFeeNo');
    if (!registration.registerEmployeeNo) missingFields.push('registerEmployeeNo');
    if (!registration.courseNo) missingFields.push('courseNo');
    
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
         new_registration(:registrationDate, :delegateNo, :courseFeeNo, :registerEmployeeNo, :courseNo, :newregistrationNo);
       END;`,
      {
        registrationDate: registration.registrationDate,
        delegateNo: registration.delegateNo,
        courseFeeNo: registration.courseFeeNo,
        registerEmployeeNo: registration.registerEmployeeNo,
        courseNo: registration.courseNo,
        newregistrationNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newregistrationNo = result.outBinds.newregistrationNo[0];
    console.log(`Registration added successfully with ID: ${newregistrationNo}`);
    
    return newregistrationNo; // Return the generated registrationNo if needed
  } catch (err) {
    console.error('Error inserting registration:', err);
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

module.exports = { addRegistration };
