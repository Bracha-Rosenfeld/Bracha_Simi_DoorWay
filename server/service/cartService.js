const db = require('../../database/connections');
exports.queryAllFavorites = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (rows.length === 0) {
            throw new Error('No favorites found for user with ID: ' + userId);
        }
        return rows;
    } catch (err) {
        throw new Error('Error fetching carts: ' + err.message);
    }
}
exports.queryFavoriteById = async (userId, apartmentId) => {
    try {
        const [rows] = await db.query('SELECT * FROM carts WHERE user_id = ? and apartment_id = ?', [userId, apartmentId]);
        if (rows.length === 0) {
            throw new Error('No favorite found with ID: ' + apartmentId);
        }
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching favorite with ID: ' + apartmentId + ' ' + err.message);
    }
}
exports.postFavorite = async (userId, apartmentId) => {
    try {
        const [result] = await db.query(
            'INSERT INTO carts (user_id, apartment_id) VALUES (?, ?)',
            [userId, apartmentId]
        );
        return { id: result.insertId, user_id: userId, apartment_id: apartmentId };
    } catch (err) {
        throw new Error('Error posting favorite: ' + err.message);
    }
}
exports.deleteFavorite = async (userId, apartmentId) => {
    try {
        const [result] = await db.query('DELETE FROM carts WHERE user_id = ? and apartment_id = ?', [userId, apartmentId]);
        if (result.affectedRows === 0) {
            throw new Error('No favorite found with ID: ' + apartmentId);
        }
       return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting favorite with ID: ' + id + ' ' + err.message);
    }
}