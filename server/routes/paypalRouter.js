const express = require('express');
const router = express.Router();
const { createOrder, captureOrder } = require('../controllers/paypalController');

router.post('/create-order', createOrder); // יוצרת את ההזמנה
router.post('/capture-order', captureOrder); // מאשרת את התשלום

module.exports = router;