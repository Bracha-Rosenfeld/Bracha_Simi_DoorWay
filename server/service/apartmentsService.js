const db = require('../../database/connections')

exports.queryAllApartments = async (is_approved) => {
    if (typeof is_approved !== 'undefined') {
        try {
            const [rows] = await db.query('SELECT * FROM apartments WHERE is_approved = ?', [is_approved]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching apartments: ' + err.message);
        }
    } else {
        try {
            console.log('Fetching all apartments');
            const [rows] = await db.query('SELECT * FROM apartments');
            return rows;
        } catch (err) {
            throw new Error('Error fetching all apartments: ' + err.message);
        }
    }
}

exports.queryApartmentsByIds = async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];

    const placeholders = ids.map(() => '?').join(', ');
    try {
        const [rows] = await db.query(`SELECT * FROM apartments WHERE id IN (${placeholders})`, ids);
        return rows;
    } catch (err) {
        throw new Error('Error fetching apartments by IDs: ' + err.message);
    }
}

exports.queryApartmentById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM apartments WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching apartment with ID: ' + id + ' ' + err.message);
    }
}
exports.postApartment = async (latitude, longitude, city, { publisher_id, address, price, type, title, num_of_rooms, area, floor_number, details, is_approved }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO apartments (publisher_id, address, longitude, latitude, city, price, type, title, num_of_rooms, area, floor_number, details ,is_approved) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?)',
            [publisher_id, address, longitude, latitude, city, price, type, title, num_of_rooms, area, floor_number, details, is_approved]

        );
        return { id: result.insertId, publisher_id: publisher_id, };

    } catch (err) {
        throw new Error('Error posting apartment: ' + err.message);
    }
}

exports.putApartment = async (id, { price, title, details, is_approved }) => {
    try {
        const [result] = await db.query(
            'UPDATE apartments SET price = ?, title = ?, details = ?, is_approved =? WHERE id = ?',
            [price, title, details, is_approved, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating apartment: ' + err.message);
    }
}

exports.deleteApartment = async (id) => {
    try {
        const [result1] = await db.query('DELETE FROM images WHERE id = ?', [id]);
        const [result2] = await db.query('DELETE FROM apartments WHERE id = ?', [id]);
        return result2.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting apartment: ' + err.message);
    }
}