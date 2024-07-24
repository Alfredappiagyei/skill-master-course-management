require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addLocation(location) {
  let con;

  // Validate input
  const requiredFields = [
    'locationName',
    'locationMaxSize'
  ];

  const missingFields = requiredFields.filter(field => !location[field]);

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
         NEW_LOCATION(
           :locationName,
           :locationMaxSize,
           :newLocationNo,
           :out_error_message
         );
       END;`,
      {
        locationName: location.locationName,
        locationMaxSize: location.locationMaxSize,
        newLocationNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }
      }    );

        // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting location:', errorMessage);
      throw new Error(errorMessage);
    }

    const newLocationNo = result.outBinds.newLocationNo[0];
    console.log(`Location added successfully with ID: ${newLocationNo}`);
    
    return newLocationNo; // Return the generated locationNo if needed
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

module.exports = { addLocation };
