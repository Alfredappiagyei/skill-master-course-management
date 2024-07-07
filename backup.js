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
  
        const backupFilePath = path.join(backupDirectory, 'employees_backup.json');
        fs.writeFile(backupFilePath, JSON.stringify(employees, null, 2), (err) => {
          if (err) {
            throw new Error('Failed to write file: ' + err.message);
          }
          console.log('Backup successful');
        });
      } catch (error) {
        console.error('Error during backup:', error);
      }
    };
  
    // Run the backup function
    backupEmployees();
  }).catch(err => {
    console.error('Error importing node-fetch:', err);
  });
  