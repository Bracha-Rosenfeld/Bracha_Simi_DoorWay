const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const apartmentsRoutes = require('./routes/apartmentsRoutes');
const usersRoles = require('./routes/usersRolesRoutes');
const paypalRoutes = require('./routes/paypalRouter');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./cronJob');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend port if needed
  credentials: true
}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/upload', uploadRoutes);


var PORT = process.env.PORT || 5000;
app.use('/users', userRoutes);
app.use('/apartments', apartmentsRoutes);
app.use('/usersRoles', usersRoles);
app.use('/paypal', paypalRoutes);
app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});