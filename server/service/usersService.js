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
        console.log("queryUserById ",rows[0]);
        
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching user with ID: ' + id + ' ' + err.message);
    }
}
exports.postUser = async ({ username, email, phone, address, password }, latitude, longitude, role_id) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email, phone, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
            [username, email, phone, address, latitude, longitude]
        );
        // await db.query(
        //     'INSERT INTO passwords (user_id,password) VALUES (?,?)',
        //     [result.insertId, password]
        // );
        if (password) {
            await db.query(
                'INSERT INTO passwords (user_id,password) VALUES (?,?)',
                [result.insertId, password]
            );
        }
        await db.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [result.insertId, role_id]
        );

        return { id: result.insertId, username: username, email: email, role_id: role_id };
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
        const [res1] = await db.query('DELETE FROM passwords WHERE user_id = ?', [id]);
        if (res1.affectedRows === 0) {
            throw new Error('No password found for user with ID: ' + id);
        }
        const [res2] = await db.query('DELETE FROM user_roles WHERE user_id = ?', [id]);
        if (res2.affectedRows === 0) {
            throw new Error('No roles found for user with ID: ' + id);
        }
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

exports.queryUserRoleName = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM user_roles WHERE user_id = ?', [userId]);
        const [role] = await db.query('SELECT * FROM roles WHERE id = ?', [rows[0].role_id]);
        if (!role) {
            throw new Error('Role not found for user with ID: ' + userId);
        }
        return role;
    } catch (err) {
        throw new Error('Error fetching user role: ' + err.message);
    }
}

exports.queryUserRoleId = async (roleName) => {
    try {
        const [rows] = await db.query('SELECT * FROM roles WHERE role_name = ?', [roleName]);
        if (rows.length === 0) {
            throw new Error('No roles found for role name: ' + roleName);
        }
        return rows[0].id;
    } catch (err) {
        throw new Error('Error fetching role: ' + err.message);
    }
}