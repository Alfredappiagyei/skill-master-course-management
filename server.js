const express = require('express');
const cors = require('cors');
const { getEmployees } = require('./src/Tables/employees');
const { getClients } = require('./src/Tables/clients');

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/clients', async (req, res) => {
  try {
    const clients = await getClients();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
