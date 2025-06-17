const db = require('../../database/connections');
const { queryApartmentsByIds } = require('./apartmentsService');
exports.queryAllFavorites = async (userId) => {
    try {
        const [cartRows] = await db.query('SELECT * FROM carts WHERE user_id = ?', [userId]);
        if (cartRows.length === 0) {
            return [];
        }
        const apartmentIds = cartRows.map(row => row.apartment_id);
        const apartments = await queryApartmentsByIds(apartmentIds);
        return apartments;
    } catch (err) {
        throw new Error('Error fetching cart with apartment details: ' + err.message);
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

exports.deleteAllFavorite = async (userId) => {
    try {
        const [result] = await db.query('DELETE FROM carts WHERE user_id = ? ', [userId]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting favorite with ID: ' + id + ' ' + err.message);
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
