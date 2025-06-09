const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const apartmentsRoutes = require('./routes/apartmentsRoutes');
const usersRoles = require('./routes/usersRolesRoutes');
const paypalRoutes = require('./routes/paypalRouter');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
var PORT = process.env.PORT || 5000;
app.use('/users', userRoutes);
app.use('/apartments', apartmentsRoutes);
app.use('/usersRoles', usersRoles);
app.use('/paypal', paypalRoutes);
app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});