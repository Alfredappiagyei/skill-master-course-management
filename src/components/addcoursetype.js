require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addCourseType(courseType) {
  let con;

  // Validate input
  const requiredFields = [
    'courseTypeDescription'
  ];

  const missingFields = requiredFields.filter(field => !courseType[field]);

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
         new_course_type(
           :courseTypeDescription,
           :newCourseTypeNo
         );
       END;`,
      {
        courseTypeDescription: courseType.courseTypeDescription,
        newCourseTypeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newCourseTypeNo = result.outBinds.newCourseTypeNo[0];
    console.log(`Course type added successfully with ID: ${newCourseTypeNo}`);
    
    return newCourseTypeNo; // Return the generated courseTypeNo if needed
  } catch (err) {
    console.error('Error inserting course type:', err);
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

module.exports = { addCourseType };
