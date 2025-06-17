const express = require('express');
const { getAllApartments, getApartmentById, createApartment, updateApartment, removeApartment ,rejectApartment} = require('../controllers/apartmentsController');
const router = express.Router();
router.get('/', getAllApartments);
router.get('/:id', getApartmentById);
router.post('/', createApartment);
router.put('/:id/approve', updateApartment); // this is for approving an apartment
router.put('/:id', updateApartment);
router.delete('/:id', removeApartment);
router.delete('/:id/reject', rejectApartment);
module.exports = router;