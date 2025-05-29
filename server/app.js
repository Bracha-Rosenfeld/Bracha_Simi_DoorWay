const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const express = require('express');
const userRoutes = require('./routes/usersRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
var PORT = process.env.PORT || 5000;
app.use('/users', userRoutes);
app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});