require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addPaymentMethod(paymentMethod) {
  let con;

  // Validate input
  const requiredFields = [
    'pMethodName'
  ];

  const missingFields = requiredFields.filter(field => !paymentMethod[field]);

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
         new_payment_method(
           :pMethodName,
           :newPMethodNo
         );
       END;`,
      {
        pMethodName: paymentMethod.pMethodName,
        newPMethodNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newPMethodNo = result.outBinds.newPMethodNo[0];
    console.log(`Payment method added successfully with ID: ${newPMethodNo}`);
    
    return newPMethodNo; // Return the generated pMethodNo if needed
  } catch (err) {
    console.error('Error inserting payment method:', err);
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

module.exports = { addPaymentMethod };
