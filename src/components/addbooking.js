require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addBooking(booking) {
  let con;

  // Validate input
  const requiredFields = [
    'bookingDate',
    'locationNo',
    'courseNo',
    'bookingEmployeeNo'
  ];

  const missingFields = requiredFields.filter(field => !booking[field]);

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
         new_booking(
           TO_DATE(:bookingDate, 'YYYY-MM-DD'),
           :locationNo,
           :courseNo,
           :bookingEmployeeNo,
           :newBookingNo
         );
       END;`,
      {
        bookingDate: booking.bookingDate,
        locationNo: booking.locationNo,
        courseNo: booking.courseNo,
        bookingEmployeeNo: booking.bookingEmployeeNo,
        newBookingNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    const newBookingNo = result.outBinds.newBookingNo[0];
    console.log(`Booking added successfully with ID: ${newBookingNo}`);
    
    return newBookingNo; // Return the generated bookingNo if needed
  } catch (err) {
    console.error('Error inserting booking:', err);
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

module.exports = { addBooking };
