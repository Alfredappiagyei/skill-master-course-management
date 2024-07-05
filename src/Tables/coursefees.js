const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getCoursefees() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: "system",
      password: "oracleE",
      connectString: "encarta:1522/xepdb1"
    });

    const data = await con.execute('SELECT * FROM coursefee');
    return data.rows;
  } catch (err) {
    console.error('Error fetching course fees:', err);
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

module.exports = { getCoursefees };
