
INSTRUCTIONS FOR SETTING UP DATABASE

**PERFOM THE ACTIONS IN ORDER**

## ENSURE YOU ARE IN THE DATABASE DIRECTORY OF THE PROJECT TO RUN THE SQL FILES
LOG IN TO YOUR ORACLE ACCOUNT AND DO THESE: 

1. run the 'create.sql' file 

2. run the 'code.sql'

3. run the 'populate.sql' file (OPTIONAL, YOU CAN ADD DETAILS IN FRONTEND, BUT DO THIS IF YOU WANT TO HAVE PRIOR DATA FROM BACKEND INSERTION)

Before you begin to start the app, do this
to ensure the database is correctly configured to run with your app

## NEXT
1. edit the `.env` file in the root to match your oracle login details
DB_USER =  "your_username"
DB_PASSWORD = "your_password"
DB_CONNECT_STRING = "your_oracledb_connection_string" hint: "localhost:portnumber/xepdb1"

2. run `node server.js` file in a new terminal

3. proceed to `README.md` file in the root to continue instructions

