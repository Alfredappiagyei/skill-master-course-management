require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addInvoice(invoice) {
  let con;

  try {
    con = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    const result = await con.execute(
      `BEGIN 
         NEW_INVOICE(
           TO_DATE(:dateRaised, 'YYYY-MM-DD'),
           TO_DATE(:datePaid, 'YYYY-MM-DD'),
           :creditCardNo,
           :holdersName,
           TO_DATE(:expiryDate, 'YYYY-MM-DD'),
           :registrationNo,
           :pMethodNo,
           :newInvoiceNo,
           :out_error_message
         );
       END;`,
      {
        dateRaised: invoice.dateRaised,
        datePaid: invoice.datePaid,
        creditCardNo: invoice.creditCardNo,
        holdersName: invoice.holdersName,
        expiryDate: invoice.expiryDate,
        registrationNo: invoice.registrationNo,
        pMethodNo: invoice.pMethodNo,
        newInvoiceNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }
        );

    // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting invoice:', errorMessage);
      throw new Error(errorMessage);
    } 


    const newInvoiceNo = result.outBinds.newInvoiceNo[0];
    console.log(`Invoice added successfully with ID: ${newInvoiceNo}`);

    return newInvoiceNo; // Return the generated invoiceNo if needed
  } catch (errorMessage) {

    
    if (errorMessage) {
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

module.exports = { addInvoice };
