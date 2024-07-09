require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getDelegates() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_delegate_details(:cursor);
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
    console.error('Error fetching delegates:', err);
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

async function deleteDelegate(delegateNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_delegate(:delegateNo);
       END;`,
      {
        delegateNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: delegateNo },
        
      }
    );

    await con.commit();
  } catch (err) {
    console.error('Error deleting delegate:', err);
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


async function updateDelegate(id, data) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `UPDATE DELEGATE
       SET DELEGATETITLE = :DELEGATETITLE,
           DELEGATEFNAME = :DELEGATEFNAME,
           DELEGATELNAME = :DELEGATELNAME,
           DELEGATESTREET = :DELEGATESTREET,
           DELEGATECITY = :DELEGATECITY,
           DELEGATESTATE = :DELEGATESTATE,
           DELEGATEZIPCODE = :DELEGATEZIPCODE,
           ATTTELNO = :ATTTELNO,
           ATTFAXNO = :ATTFAXNO,
           ATTEMAILADDRESS = :ATTEMAILADDRESS,
           CLIENTNO = :CLIENTNO
       WHERE DELEGATENO = :DELEGATENO`,
      {
        DELEGATETITLE: data.DELEGATETITLE,
        DELEGATEFNAME: data.DELEGATEFNAME,
        DELEGATELNAME: data.DELEGATELNAME,
        DELEGATESTREET: data.DELEGATESTREET,
        DELEGATECITY: data.DELEGATECITY,
        DELEGATESTATE: data.DELEGATESTATE,
        DELEGATEZIPCODE: data.DELEGATEZIPCODE,
        ATTTELNO: data.ATTTELNO,
        ATTFAXNO: data.ATTFAXNO,
        ATTEMAILADDRESS: data.ATTEMAILADDRESS,
        CLIENTNO: data.CLIENTNO,
        DELEGATENO: id
      },
      { autoCommit: true }
    );

    return data;
  } catch (err) {
    console.error('Error updating delegate:', err);
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

module.exports = { getDelegates, deleteDelegate, updateDelegate };
