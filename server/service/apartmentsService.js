const path = require('path');
const { deleteFile } = require('./uploadService'); // נניח שזה הנתיב הנכון
const db = require('../../database/connections')
const { deleteAllFavoritesByAptId } = require('../helpers/helpers')

exports.queryAllApartments = async (is_approved, limit, offset) => {
    if (typeof is_approved !== 'undefined') {
        try {
            const [rows] = await db.query('SELECT * FROM apartments WHERE is_approved = ? ORDER BY id DESC  LIMIT ? OFFSET ?', [is_approved, limit, offset]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching apartments: ' + err.message);
        }
    } else {
        try {
            const [rows] = await db.query('SELECT * FROM apartments ORDER BY id DESC  LIMIT ? OFFSET ?',[limit, offset]);
            return rows;
        } catch (err) {
            throw new Error('Error fetching all apartments: ' + err.message);
        }
    }
}
exports.queryAllUsersApartments = async (publisher_id) => {
    if (!publisher_id) {
        throw new Error('Publisher ID is required');
    }
    try {
        const [rows] = await db.query('SELECT * FROM apartments WHERE publisher_id = ?', [publisher_id]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching user apartments: ' + err.message);
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

exports.postApartment = async (latitude, longitude, city, { publisher_id, address, price, type, title, num_of_rooms, area, floor_number, details, is_approved, image_url }) => {

    try {
        const [result] = await db.query(
            'INSERT INTO apartments (publisher_id, address, longitude, latitude, city, price, type, title, num_of_rooms, area, floor_number, details ,is_approved, image_url) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?,?,?)',
            [publisher_id, address, longitude, latitude, city, price, type, title, num_of_rooms, area, floor_number, details, is_approved, image_url]

        );
        return { id: result.insertId, publisher_id: publisher_id, title: title };

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

exports.deleteApartment = async (apartmentId) => {
    try {
        const isInCart = await deleteAllFavoritesByAptId(apartmentId);
        const [rows] = await db.query('SELECT image_url FROM apartments WHERE id = ?', [apartmentId]);
        if (rows.length === 0) {
            throw new Error('Apartment not found');
        }
        const imageUrl = rows[0].image_url;
        if (imageUrl) {
            let relativePath = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl;
            const imagePath = path.resolve(__dirname, '..', relativePath);
            await deleteFile(imagePath);
        }
        const [result] = await db.query('DELETE FROM apartments WHERE id = ?', [apartmentId]);
        return result.affectedRows > 0;

    } catch (err) {
        throw new Error('Error deleting apartment: ' + err.message);
    }
};
