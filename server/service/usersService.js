const db = require('../../database/connections')

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
exports.postUser = async ({ username, email, phone, address, password ,role}) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email,phone, address) VALUES (?, ?, ?, ?)',
            [username, email, phone, address]
        );
        await db.query(
            'INSERT INTO passwords (user_id,password) VALUES (?,?)',
            [result.insertId, password]
        );
        await db.query(
           'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [result.insertId, rolename]
        );

        return { id: result.insertId, username, email };
    } catch (err) {
        throw new Error('Error posting user: ' + err.message);
    }
}

exports.putUser = async (id, { username, email }) => {
    try {
        const [result] = await db.query(
            'UPDATE users SET username = ?, email = ? WHERE id = ?',
            [username, email, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating user: ' + err.message);
    }
}
exports.deleteUser = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting user: ' + err.message);
    }
}

exports.queryUserByUsername = async (username) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error('Error fetching user by username: ' + err.message);
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