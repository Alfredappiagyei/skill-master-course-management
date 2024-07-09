require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addRegistration(registration) {
  let con;

  // Validate input
  const requiredFields = [
    'registrationDate',
    'delegateNo',
    'courseFeeNo',
    'registerEmployeeNo',
    'courseNo'
  ];

  const missingFields = requiredFields.filter(field => !registration[field]);

  if (missingFields.length > 0) {
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
         NEW_REGISTRATION(
           TO_DATE(:registrationDate,'YYYY-MM-DD'),
           :delegateNo,
           :courseFeeNo,
           :registerEmployeeNo,
           :courseNo,
           :newRegistrationNo,
           :out_error_message
         );
       END;`,
      {
        registrationDate: registration.registrationDate,
        delegateNo: registration.delegateNo,
        courseFeeNo: registration.courseFeeNo,
        registerEmployeeNo: registration.registerEmployeeNo,
        courseNo: registration.courseNo,
        newRegistrationNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      },
      { autoCommit: true }
    );

    const newRegistrationNo = result.outBinds.newRegistrationNo[0];
    console.log(`Registration added successfully with ID: ${newRegistrationNo}`);
    
    return newRegistrationNo; // Return the generated registrationNo if needed
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
