require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addClient(client) {
  let con;

  try {
    con = await oracledb.getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         new_client(:in_clientName, :in_clientEmail, :in_clientContact, :out_newclientNo, :out_error_message);
       END;`,
      {
        in_clientName: client.clientName,
        in_clientEmail: client.clientEmail,
        in_clientContact: client.clientContact,
        out_newclientNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }
    );

    // Check for errors returned from PL/SQL procedure
    if (result.outBinds.out_error_message) {
      throw new Error(result.outBinds.out_error_message);
    }

    // If no error, retrieve the generated clientNo
    const newclientNo = result.outBinds.out_newclientNo[0];
    console.log(`Client added successfully with ID: ${newclientNo}`);
    
    return newclientNo; // Return the generated clientId if needed
  } catch (err) {
    console.error('Error inserting client:', err);
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

module.exports = { addClient };
