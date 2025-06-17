const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllFavorites,getFavoriteById ,createFavorite, removeFavorite } = require('../controllers/cartController');
const {verifyToken} = require('../helpers/middelware');
router.get('/', verifyToken, getAllFavorites);
router.post('/',verifyToken, createFavorite);
router.delete('/:apartmentId',verifyToken, removeFavorite);
module.exports = router;