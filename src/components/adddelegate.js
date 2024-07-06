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
      user: "system",
      password: "oracleE",
      connectString: "encarta:1522/xepdb1"
    });

    const result = await con.execute(
      `BEGIN 
         new_delegate(
           :delegateTitle, 
           :delegateFName, 
           :delegateLName, 
           :delegateStreet, 
           :delegateCity, 
           :delegateState, 
           :delegateZipCode, 
           :attTelNo, 
           :attFaxNo, 
           :attEmailAddress, 
           :clientNo, 
           :newdelegateNo
         );
       END;`,
      {
        delegateTitle: delegate.delegateTitle,
        delegateFName: delegate.delegateFName,
        delegateLName: delegate.delegateLName,
        delegateStreet: delegate.delegateStreet,
        delegateCity: delegate.delegateCity,
        delegateState: delegate.delegateState,
        delegateZipCode: delegate.delegateZipCode,
        attTelNo: delegate.attTelNo,
        attFaxNo: delegate.attFaxNo,
        attEmailAddress: delegate.attEmailAddress,
        clientNo: delegate.ClientNo,
        newdelegateNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newdelegateNo = result.outBinds.newdelegateNo[0];
    console.log(`Delegate added successfully with ID: ${newdelegateNo}`);
    
    return newdelegateNo; // Return the generated delegateNo if needed
  } catch (err) {
    console.error('Error inserting delegate:', err);
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
