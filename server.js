require('dotenv').config();
const express = require('express');
const cors = require('cors');

// debugging DB CON
console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_CONNECT_STRING: ${process.env.DB_CONNECT_STRING}`);

//  RETRIEVING
const { getEmployees } = require('./src/Tables/employees');
const { getClients } = require('./src/Tables/clients');
const { getDelegates } = require('./src/Tables/delegates');
const { getCourseTypes } = require('./src/Tables/coursetypes');
const { getCourses } = require('./src/Tables/courses');
const { getCoursefees } = require('./src/Tables/coursefees');
const { getPayments } = require('./src/Tables/payments');
const { getLocations } = require('./src/Tables/locations');
const { getRegistrations } = require('./src/Tables/registrations');
const { getInvoices } = require('./src/Tables/invoices');
const { getBookings } = require('./src/Tables/bookings');


//  ADDING
const { addEmployee } = require('./src/components/addemployee');
const { addClient } = require('./src/components/addclient');
const { addDelegate } = require('./src/components/adddelegate');
const { addCourseType } = require('./src/components/addcoursetype');
const { addCourse } = require('./src/components/addcourse');
const { addCourseFee } = require('./src/components/addcoursefee');
const { addPaymentMethod } = require('./src/components/addpayment');
const { addLocation } = require('./src/components/addlocation');
const { addRegistration } = require('./src/components/addregistration');


const { addBooking } = require('./src/components/addbooking');








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

app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await getRegistrations();
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = await getInvoices();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await getBookings();
    res.json(bookings);
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

app.post('/api/delegates', async (req, res) => {
  try {
    await addDelegate(req.body);
    res.status(201).json({ message: 'Delegate added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/clients', async (req, res) => {
  try {
    await addClient(req.body);
    res.status(201).json({ message: 'Client added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/coursetypes', async (req, res) => {
  try {
    await addCourseType(req.body);
    res.status(201).json({ message: 'Course Type added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    await addCourse(req.body);
    res.status(201).json({ message: 'Course  added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/coursefees', async (req, res) => {
  try {
    await addCourseFee(req.body);
    res.status(201).json({ message: 'Course Fee added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/paymentmethods', async (req, res) => {
  try {
    await addPaymentMethod(req.body);
    res.status(201).json({ message: 'Payment Method added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    await addLocation(req.body);
    res.status(201).json({ message: 'Location added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/registrations', async (req, res) => {
  try {
    await addRegistration(req.body);
    res.status(201).json({ message: 'Registration added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/bookings', async (req, res) => {
  try {
    await addBooking(req.body);
    res.status(201).json({ message: 'Booking added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
