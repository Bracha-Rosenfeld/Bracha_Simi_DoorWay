const e = require('express');
const { queryAllFavorites, queryFavoriteById, postFavorite, deleteFavorite } = require('../service/cartService');
exports.getAllFavorites = async (req, res) => {
  try {
    const favorites = await queryAllFavorites(req.user.id);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createFavorite = async (req, res) => {
  try {
    const favorite = await postFavorite(req.user.id, req.body.apartment_id);
    if (!favorite) {
      return res.status(400).json({ error: 'Favorite cannot be created' });
    }
    res.status(200).json(favorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.removeFavorite = async (req, res) => {
  try {
    const isRemoved = await deleteFavorite(req.user.id, req.params.apartmentId);
    if (!isRemoved) {
      return res.status(404).json({ error: 'Favorite with id:' + req.params.apartmentId + ' not found' });
    }
    res.status(200).json('Favorite with user_id: ' + req.params.userId + 'and apartment_id: ' + req.params.apartmentId + ' removed')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
