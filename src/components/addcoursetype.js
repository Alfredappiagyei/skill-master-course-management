require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addCourseType(courseType) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         new_course_type(
           :in_courseTypeDescription,
           :out_newCourseTypeNo,
           :out_error_message
         );
       END;`,
      {
        in_courseTypeDescription: courseType.courseTypeDescription,
        out_newCourseTypeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      });

       // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting course type:', errorMessage);
      throw new Error(errorMessage);
    }

    const newCourseTypeNo = result.outBinds.out_newCourseTypeNo[0];
    console.log(`Course type added successfully with ID: ${newCourseTypeNo}`);

    return newCourseTypeNo; // Return the generated courseTypeNo if needed
  } catch (err) {
 
    if (errorMessage) {
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

module.exports = { addCourseType };
