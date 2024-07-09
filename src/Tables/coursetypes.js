require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getCourseTypes() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_coursetype_details(:cursor);
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
    console.error('Error fetching coursetypes:', err);
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

async function deleteCourseType(courseTypeNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_courseType(:courseTypeNo);
       END;`,
      {
        courseTypeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: courseTypeNo },

      }
    );
    await con.commit();


  } catch (err) {
    console.error('Error deleting course type:', err);
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


module.exports = { getCourseTypes, deleteCourseType };
