const db = require('../../database/connections')

exports.queryAllApartments = async (is_approved) => {
    try {
        const [rows] = await db.query('SELECT * FROM apartments WHERE is_approved = ?', [is_approved]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching apartments: ' + err.message);
    }
}

exports.queryAllApartments = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM apartments');
        return rows;
    } catch (err) {
        throw new Error('Error fetching all apartments: ' + err.message);
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
exports.postApartment = async (latitude,longitude,{ publisher_id,address, price, type, title, num_of_rooms, area, floor_number, details }) => {
    try {
        const [result] = await db.query(
        'INSERT INTO apartments (publisher_id, address, longitude, latitude, price, type, title, num_of_rooms, area, floor_number, details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [publisher_id, address, longitude, latitude, price, type, title, num_of_rooms, area, floor_number, details]
        );
        return { id: result.insertId, publisher_id: publisher_id, };

    } catch (err) {
        throw new Error('Error posting apartment: ' + err.message);
    }
}

exports.putApartment = async (id, { price, title, details }) => {
    try {
        const [result] = await db.query(
            'UPDATE apartments SET price = ?, title = ?, details = ?  WHERE id = ?',
            [price, title, details, id]
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