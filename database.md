Before you begin to start the app, do this
to ensure the database is correctly configured to run with your app

## Instructions
1. edit the `db.env` file in the root to match your oracle login details
DB_USER =  "your_username"
DB_PASSWORD = "your_password"
DB_CONNECT_STRING = "your_oracledb_connection_string" hint: "localhost:portnumber/xepdb1"

2. run `server.js` file in a new terminal

3. connect to your ORACLE DATABASE (preferably in a different terminal too )
using `sqlplus username@localhost:port/xepdb1`

4. proceed to `README.md` file to continue instructions
