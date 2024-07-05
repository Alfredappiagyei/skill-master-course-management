const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getCourses() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: "system",
      password: "oracleE",
      connectString: "encarta:1522/xepdb1"
    });

    const data = await con.execute('SELECT * FROM course');
    return data.rows;
  } catch (err) {
    console.error('Error fetching courses:', err);
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

module.exports = { getCourses };
