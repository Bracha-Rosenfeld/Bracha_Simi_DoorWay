const path = require('path');
const { deleteFile } = require('./uploadService'); // נניח שזה הנתיב הנכון
const db = require('../../database/connections')
const { deleteAllFavoritesByAptId } = require('../helpers/helpers');
const { log } = require('console');

// exports.queryAllApartments = async (is_approved, limit, offset) => {
//     if (typeof is_approved !== 'undefined') {
//         try {
//             const [rows] = await db.query('SELECT * FROM apartments WHERE is_approved = ? ORDER BY id DESC  LIMIT ? OFFSET ?', [is_approved, limit, offset]);
//             return rows;
//         } catch (err) {
//             throw new Error('Error fetching apartments: ' + err.message);
//         }
//     } else {
//         try {
//             const [rows] = await db.query('SELECT * FROM apartments ORDER BY id DESC  LIMIT ? OFFSET ?',[limit, offset]);
//             return rows;
//         } catch (err) {
//             throw new Error('Error fetching all apartments: ' + err.message);
//         }
//     }
// }
exports.queryAllApartments = async (is_approved, limit, offset) => {
    const baseQuery = `
        SELECT a.*, u.phone AS owner_phone
        FROM apartments a
        JOIN users u ON a.publisher_id = u.id
    `;

    try {
        let rows;
        if (typeof is_approved !== 'undefined') {
            const [result] = await db.query(
                `${baseQuery} WHERE a.is_approved = ? ORDER BY a.id DESC LIMIT ? OFFSET ?`,
                [is_approved, limit, offset]
            );
            rows = result;
        } else {
            const [result] = await db.query(
                `${baseQuery} ORDER BY a.id DESC LIMIT ? OFFSET ?`,
                [limit, offset]
            );
            rows = result;
        }
        return rows;
    } catch (err) {
        throw new Error('Error fetching apartments: ' + err.message);
    }
};

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

// exports.queryApartmentsByIds = async (ids) => {
//     if (!Array.isArray(ids) || ids.length === 0) return [];

//     const placeholders = ids.map(() => '?').join(', ');
//     try {
//         const [rows] = await db.query(`SELECT * FROM apartments WHERE id IN (${placeholders})`, ids);
//         return rows;
//     } catch (err) {
//         throw new Error('Error fetching apartments by IDs: ' + err.message);
//     }
// }
exports.queryApartmentsByIds = async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return [];

    const placeholders = ids.map(() => '?').join(', ');
    try {
        const [rows] = await db.query(
          `SELECT a.*, u.phone AS owner_phone
           FROM apartments a
           JOIN users u ON a.publisher_id = u.id
           WHERE a.id IN (${placeholders})`,
          ids
        );
        return rows;
    } catch (err) {
        throw new Error('Error fetching apartments by IDs: ' + err.message);
    }
}

// exports.queryApartmentById = async (id) => {
//     try {
//         const [rows] = await db.query('SELECT a.*,u.phone AS owner_phone FROM apartments a JOIN users u ON a.publisher_id = u.id WHERE id = ?', [id]);
//         return rows[0];
//     } catch (err) {
//         throw new Error('Error fetching apartment with ID: ' + id + ' ' + err.message);
//     }
// }

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
exports.deleteAllUsersApartments = async (userId) => {
    try {
        console.log('in deleteAllUsersApartments ');
        const [apartmentsIds] = await db.query('SELECT id FROM apartments WHERE publisher_id = ?', [userId]);
        console.log('apartmentsIds', apartmentsIds);
        if (apartmentsIds && apartmentsIds.length > 0) {
            for (const apartmentId of apartmentsIds) {
                const isInCart = await deleteAllFavoritesByAptId(apartmentId.id);
                console.log('isInCart', isInCart);
            }
        }
        const [img_urls] = await db.query('SELECT image_url FROM apartments WHERE publisher_id = ?', [userId]);
        if (img_urls.length === 0) {
            for (const url of img_urls) {
                console.log('url.image_url', url.image_url);
                const relativePath = url.image_url.startsWith('/') ? url.image_url.slice(1) : url.image_url;
                console.log('relativePath', relativePath);

                const imagePath = path.resolve(__dirname, '..', relativePath);
                console.log('imagePath', imagePath);
                await deleteFile(imagePath);
                console.log('imgae was deleted!');
            }
        }
        console.log('deleting apartments!');
        const result = await db.query('DELETE FROM apartments WHERE publisher_id = ?', [userId]);
        console.log('result', result);
        return result.affectedRows > 0;

    } catch (err) {
        throw new Error('Error deleting apartment: ' + err.message);
    }
}