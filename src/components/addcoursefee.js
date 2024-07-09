require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addCourseFee(courseFee) {
  let con;

  // Validate input
  const requiredFields = [
    'feeDescription',
    'fee',
    'courseNo'
  ];

  const missingFields = requiredFields.filter(field => !courseFee[field]);

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
         new_course_fee(
           :feeDescription,
           :fee,
           :courseNo,
           :newCourseFeeNo,
           :out_error_message
         );
       END;`,
      {
        feeDescription: courseFee.feeDescription,
        fee: courseFee.fee,
        courseNo: courseFee.courseNo,
        newCourseFeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }    );

    const newCourseFeeNo = result.outBinds.newCourseFeeNo[0];
    console.log(`Course fee added successfully with ID: ${newCourseFeeNo}`);
    
    return newCourseFeeNo; // Return the generated courseFeeNo if needed
  } catch (err) {
    console.error('Error inserting course fee:', err);
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

module.exports = { addCourseFee };
