require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addDelegate(delegate) {
  let con;

  // Validate input
  const requiredFields = [
    'delegateTitle',
    'delegateFName',
    'delegateLName',
    'delegateStreet',
    'delegateCity',
    'delegateState',
    'delegateZipCode',
    'attTelNo',
    'attFaxNo',
    'attEmailAddress',
    'clientNo'
  ];

  const missingFields = requiredFields.filter(field => !delegate[field]);

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
         new_delegate(
           :in_delegateTitle, 
           :in_delegateFName, 
           :in_delegateLName, 
           :in_delegateStreet, 
           :in_delegateCity, 
           :in_delegateState, 
           :in_delegateZipCode, 
           :in_attTelNo, 
           :in_attFaxNo, 
           :in_attEmailAddress, 
           :in_clientNo, 
           :out_newdelegateNo, 
           :out_error_message
         );
       END;`,
      {
        in_delegateTitle: delegate.delegateTitle,
        in_delegateFName: delegate.delegateFName,
        in_delegateLName: delegate.delegateLName,
        in_delegateStreet: delegate.delegateStreet,
        in_delegateCity: delegate.delegateCity,
        in_delegateState: delegate.delegateState,
        in_delegateZipCode: delegate.delegateZipCode,
        in_attTelNo: delegate.attTelNo,
        in_attFaxNo: delegate.attFaxNo,
        in_attEmailAddress: delegate.attEmailAddress,
        in_clientNo: delegate.clientNo,
        out_newdelegateNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }    );

    const newdelegateNo = result.outBinds.out_newdelegateNo[0];
    console.log(`Delegate added successfully with ID: ${newdelegateNo}`);
    
    return newdelegateNo; // Return the generated delegateNo if needed
  } catch (TypeError) {
    console.error('Error inserting delegate:', 'CLIENT NUMBER DOES NOT EXIST');
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

module.exports = { addDelegate };
