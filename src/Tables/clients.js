require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function getClients() {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         get_client_details(:cursor);
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
    console.error('Error fetching clients:', err);
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

async function deleteClient(clientNo) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `BEGIN 
         delete_client(:clientNo);
       END;`,
      {
        clientNo: { type: oracledb.NUMBER, dir: oracledb.BIND_IN, val: clientNo },
        
      }
    );

    console.log('Client deleted successfully');

  } catch (err) {
    if (err.errorNum === 20001) {
      console.error('Cannot delete client due to related records.');
    } else {
      console.error('Error deleting client:', err);
    }    throw err;
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

async function updateClient(clientNo, clientName, clientEmail, clientContact) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    await con.execute(
      `UPDATE Clients
       SET CLIENTNAME = :clientName,
           CLIENTEMAIL = :clientEmail,
           CLIENTCONTACT = :clientContact
       WHERE CLIENTNO = :clientNo`,
      { clientNo, clientName, clientEmail, clientContact }
    );

    await con.commit();

    return { CLIENTNO: clientNo, CLIENTNAME: clientName, CLIENTEMAIL: clientEmail, CLIENTCONTACT: clientContact };
  } catch (err) {
    console.error('Error updating client:', err);
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


module.exports = { getClients, deleteClient, updateClient };
