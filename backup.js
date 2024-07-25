// Use dynamic import for CommonJS compatibility
import('node-fetch').then(({ default: fetch }) => {
  const fs = require('fs');
  const path = require('path');

  const backupDirectory = 'backups';

  // Ensure the backup directory exists
  if (!fs.existsSync(backupDirectory)) {
      fs.mkdirSync(backupDirectory, { recursive: true });
  }

  const backupEmployees = async () => {
      try {
          const response = await fetch('http://localhost:3001/api/employees');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const employees = await response.json();

          // Create a timestamp for the backup file
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const backupFilePath = path.join(backupDirectory, `employees_backup_${timestamp}.json`);

          fs.writeFile(backupFilePath, JSON.stringify(employees, null, 2), (err) => {
              if (err) {
                  throw new Error('Failed to write file: ' + err.message);
              }
              console.log('Employee Backup successful. File saved as:', backupFilePath);
          });
      } catch (error) {
          console.error('Error during backup:', error);
      }
  };

  const backupClients = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/clients');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const clients = await response.json();

        // Create a timestamp for the backup file
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFilePath = path.join(backupDirectory, `clients_backup_${timestamp}.json`);

        fs.writeFile(backupFilePath, JSON.stringify(clients, null, 2), (err) => {
            if (err) {
                throw new Error('Failed to write file: ' + err.message);
            }
            console.log('Client Backup successful. File saved as:', backupFilePath);
        });
    } catch (error) {
        console.error('Error during backup:', error);
    }
};

const backupDelegates = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/delegates');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const delegates = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `delegates_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(delegates, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Delegate Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupCourseTypes = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/coursetypes');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const coursetypes = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `coursetypes_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(coursetypes, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Course Type Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupCourses = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/courses');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const courses = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `courses_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(courses, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Course Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupCourseFees = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/coursefees');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const coursefees = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `coursefees_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(coursefees, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Course Fee Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupPaymentMethods = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/payments');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const paymentmethods = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `payment_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(paymentmethods, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Payment Methods Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupLocations = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/locations');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const locations = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `locations_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(locations, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Location Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupRegistrations = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/registrations');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const registartions = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `registrations_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(registartions, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Registration Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};

const backupInvoices = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/invoices');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const invoices = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `invoices_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(invoices, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Invoice Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};


const backupBookings = async () => {
  try {
      const response = await fetch('http://localhost:3001/api/bookings');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      const bookings = await response.json();

      // Create a timestamp for the backup file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilePath = path.join(backupDirectory, `bookings_backup_${timestamp}.json`);

      fs.writeFile(backupFilePath, JSON.stringify(bookings, null, 2), (err) => {
          if (err) {
              throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Booking Backup successful. File saved as:', backupFilePath);
      });
  } catch (error) {
      console.error('Error during backup:', error);
  }
};







  // Run the backup function
  backupEmployees();
  backupClients();
  backupDelegates();
  backupCourseTypes();
  backupCourses();
  backupCourseFees();
  backupPaymentMethods();
  backupLocations();
  backupRegistrations();
  backupInvoices();
  backupBookings();
}).catch(err => {
  console.error('Error importing node-fetch:', err);
});
