require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getCoursefees() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_coursefee_details(:cursor);
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
    console.error('Error fetching coursefees:', err);
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

async function deleteCourseFee(courseFeeNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_courseFee(:courseFeeNo);
       END;`,
      {
        courseFeeNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: courseFeeNo },
        
      },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting course fee:', err);
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



module.exports = { getCoursefees, deleteCourseFee };
