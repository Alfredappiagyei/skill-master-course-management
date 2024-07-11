require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addPaymentMethod(paymentMethod) {
  let con;

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
           :newPMethodNo,
           :out_error_message
         );
       END;`,
      {
        pMethodName: paymentMethod.pMethodName,
        newPMethodNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }    );

        // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting payment method:', errorMessage);
      throw new Error(errorMessage);
    }

    const newPMethodNo = result.outBinds.newPMethodNo[0];
    console.log(`Payment method added successfully with ID: ${newPMethodNo}`);
    
    return newPMethodNo; // Return the generated pMethodNo if needed
  } catch (err) {
     // does not do anything. just so the code doesnot break. originally has 
    // to throw some error but shows too much info i dont want that
    if (errorMessage) {
      console.error('Error inserting payment method:', errorMessage);
      throw new Error(errorMessage);
    }
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
