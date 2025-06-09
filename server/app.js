const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const apartmentsRoutes = require('./routes/apartmentsRoutes');
const usersRoles = require('./routes/usersRolesRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend port if needed
  credentials: true
}));
app.use(cookieParser());

var PORT = process.env.PORT || 5000;
app.use('/users', userRoutes);
app.use('/apartments', apartmentsRoutes);
app.use('/usersRoles', usersRoles);
app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});