require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addClient(client) {
  let con;

  // Validate input
  if (!client.clientName || !client.clientEmail || !client.clientContact) {
    const missingFields = [];
    if (!client.clientName) missingFields.push('clientName');
    if (!client.clientEmail) missingFields.push('clientEmail');
    if (!client.clientContact) missingFields.push('clientContact');
    
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
         new_client(:clientName, :clientEmail, :clientContact, :newclientNo);
       END;`,
      {
        clientName: client.clientName,
        clientEmail: client.clientEmail,
        clientContact: client.clientContact,
        newclientNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newclientNo = result.outBinds.newclientNo[0];
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
