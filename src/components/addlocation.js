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
         new_location(
           :locationName,
           :locationMaxSize,
           :newLocationNo
         );
       END;`,
      {
        locationName: location.locationName,
        locationMaxSize: location.locationMaxSize,
        newLocationNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newLocationNo = result.outBinds.newLocationNo[0];
    console.log(`Location added successfully with ID: ${newLocationNo}`);
    
    return newLocationNo; // Return the generated locationNo if needed
  } catch (err) {
    console.error('Error inserting location:', err);
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

module.exports = { addLocation };