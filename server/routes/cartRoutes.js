const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllFavorites,getFavoriteById ,createFavorite, removeFavorite } = require('../controllers/cartController');
router.get('/', getAllFavorites);
// router.get('/:apartmentId', getFavoriteById);
router.post('/', createFavorite);
router.delete('/:apartmentId', removeFavorite);
module.exports = router;