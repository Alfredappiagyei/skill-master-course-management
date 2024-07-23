// // Use dynamic import for CommonJS compatibility
// import('node-fetch').then(({ default: fetch }) => {
//     const fs = require('fs');
//     const path = require('path');
  
//     const backupDirectory = 'backups';
  
//     // Ensure the backup directory exists
//     if (!fs.existsSync(backupDirectory)) {
//       fs.mkdirSync(backupDirectory, { recursive: true });
//     }
  
//     const backupEmployees = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/api/employees');
//         if (!response.ok) {
//           throw new Error('Network response was not ok ' + response.statusText);
//         }
//         const employees = await response.json();
  
//         const backupFilePath = path.join(backupDirectory, 'employees_backup.json');
//         fs.writeFile(backupFilePath, JSON.stringify(employees, null, 2), (err) => {
//           if (err) {
//             throw new Error('Failed to write file: ' + err.message);
//           }
//           console.log('Backup successful');
//         });
//       } catch (error) {
//         console.error('Error during backup:', error);
//       }
//     };
  
//     // Run the backup function
//     backupEmployees();
//   }).catch(err => {
//     console.error('Error importing node-fetch:', err);
//   });
  

require('dotenv').config();
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function addBooking(booking) {
  let con;

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
           :newBookingNo,
           :out_error_message
         );
       END;`,
      {
        bookingDate: booking.bookingDate,
        locationNo: booking.locationNo,
        courseNo: booking.courseNo,
        bookingEmployeeNo: booking.bookingEmployeeNo,
        newBookingNo: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        out_error_message: { type: oracledb.STRING, dir: oracledb.BIND_OUT, maxSize: 2000 }

      }    );

       // Check for errors returned from PL/SQL procedure
    const errorMessage = result.outBinds.out_error_message;
    if (errorMessage) {
      console.error('Error inserting booking:', errorMessage);
      throw new Error(errorMessage);
    }

    const newBookingNo = result.outBinds.newBookingNo[0];
    console.log(`Booking added successfully with ID: ${newBookingNo}`);
    
    return newBookingNo; // Return the generated bookingNo if needed
  } catch (err) {
     // does not do anything. just so the code doesnot break. originally has 
    // to throw some error but shows too much info i dont want that
    if (errorMessage) {
      console.error('Error inserting booking:', errorMessage);
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

module.exports = { addBooking };
