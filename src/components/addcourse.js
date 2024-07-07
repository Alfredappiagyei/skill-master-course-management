require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addCourse(course) {
  let con;

  // Validate input
  const requiredFields = [
    'courseName',
    'courseDescription',
    'startDate',
    'startTime',
    'endDate',
    'endTime',
    'maxDelegates',
    'confirmed',
    'delivererEmployeeNo',
    'courseTypeNo'
  ];

  const missingFields = requiredFields.filter(field => !course[field]);

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
         new_course(
           :courseName,
           :courseDescription,
           TO_DATE(:startDate, 'YYYY-MM-DD'),
           TO_DATE(:startTime, 'HH24:MI:SS'),
           TO_DATE(:endDate, 'YYYY-MM-DD'),
           TO_DATE(:endTime, 'HH24:MI:SS'),
           :maxDelegates,
           :confirmed,
           :delivererEmployeeNo,
           :courseTypeNo,
           :newCourseNo
         );
       END;`,
      {
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        startDate: course.startDate,
        startTime: course.startTime,
        endDate: course.endDate,
        endTime: course.endTime,
        maxDelegates: course.maxDelegates,
        confirmed: course.confirmed,
        delivererEmployeeNo: course.delivererEmployeeNo,
        courseTypeNo: course.courseTypeNo,
        newCourseNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newCourseNo = result.outBinds.newCourseNo[0];
    console.log(`Course added successfully with ID: ${newCourseNo}`);
    
    return newCourseNo; // Return the generated courseNo if needed
  } catch (err) {
    console.error('Error inserting course:', err);
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

module.exports = { addCourse };
