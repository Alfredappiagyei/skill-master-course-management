const express = require('express');
const cors = require('cors');

//  RETRIEVING
const { getEmployees } = require('./src/Tables/employees');
const { getClients } = require('./src/Tables/clients');
const { getDelegates } = require('./src/Tables/delegates');
const { getCourseTypes } = require('./src/Tables/coursetypes');
const { getCourses } = require('./src/Tables/courses');
const { getCoursefees } = require('./src/Tables/coursefees');
const { getPayments } = require('./src/Tables/payments');
const { getLocations } = require('./src/Tables/locations');

//  ADDING
const { addEmployee } = require('./src/Components/addemployee');






const app = express();
const port = 3001;

app.use(cors());

//  RETRIEVING
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

app.get('/api/delegates', async (req, res) => {
  try {
    const delegates = await getDelegates();
    res.json(delegates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/coursetypes', async (req, res) => {
  try {
    const coursetypes = await getCourseTypes();
    res.json(coursetypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/coursefees', async (req, res) => {
  try {
    const coursefees = await getCoursefees();
    res.json(coursefees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/payments', async (req, res) => {
  try {
    const payments = await getPayments();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/locations', async (req, res) => {
  try {
    const locations = await getLocations();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  ADDING 
app.use(express.json())

app.post('/api/employees', async (req, res) => {
  try {
    await addEmployee(req.body);
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
