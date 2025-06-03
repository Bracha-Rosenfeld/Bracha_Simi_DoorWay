const express = require('express');
const { getAllApartments, getApartmentById, createApartment, updateApartment, removeApartment } = require('../controllers/apartmentsController');
const router = express.Router();
router.get('/', getAllApartments);
router.get('/:id', getApartmentById);
router.post('/', createApartment);
router.put('/:id', updateApartment);
router.delete('/:id', removeApartment);
module.exports = router;