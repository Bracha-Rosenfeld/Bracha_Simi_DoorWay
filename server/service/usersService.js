const db = require('../../database/connections')
const { queryAllUserRoles, postUserRole, deleteAllUserRole } = require('./usersRolesService')
const { deleteAllUsersApartments } = require('./apartmentsService')
const { deleteAllFavorite } = require('./cartService')
exports.queryAllUsers = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } catch (err) {
        throw new Error('Error fetching users: ' + err.message);
    }
}

exports.queryUserById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching user with ID: ' + id + ' ' + err.message);
    }
}
exports.postUser = async ({ username, email, phone, address, password }, latitude, longitude, roleName) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, phone, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, phone, address, latitude, longitude]
        );
        if (password != NULL) {
            await db.query(
                'INSERT INTO passwords (user_id,password) VALUES (?,?)',
                [result.insertId, password]
            );
        }
        const roleResult = await postUserRole(result.insertId, roleName);
        return { id: result.insertId, username: username, email: email };
    } catch (err) {
        throw new Error('Error posting user: ' + err.message);
    }
}

exports.putUser = async (id, { username, email, phone, address }, latitude, longitude) => {
    try {
        const [result] = await db.query(
            'UPDATE users SET username = ?, email = ? , phone = ? , address = ? , latitude = ? , longitude = ?  WHERE id = ?',
            [username, email, phone, address, latitude, longitude, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating user: ' + err.message);
    }
}
exports.deleteUser = async (id) => {
    try {
        //check if the user us admin.
        const userRoles = await queryAllUserRoles(id);
        const role = userRoles[0];
        if (role && role === 'admin') {
            throw new Error('Cannot delete ' + role + ' user');
        }
        //delete the user's password.
        const [res1] = await db.query('DELETE FROM passwords WHERE user_id = ?', [id]);
        //delete the user's roles.
        const rolesWereDeleted = await deleteAllUserRole(id);
        //delet the user's cart.
        const cartWasDeleted = await deleteAllFavorite(id);
        //delete the user's apartments
        const apaertmentsWereDeleted = await deleteAllUsersApartments(id);
        //delete the user!
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting user: ' + err.message);
    }
}

exports.queryUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error('Error fetching user by email: ' + err.message);
    }
};

exports.queryUserPassword = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM passwords WHERE user_id = ?', [userId]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error('Error fetching user password: ' + err.message);
    }
}
