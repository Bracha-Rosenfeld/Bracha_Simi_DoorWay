const db = require('../../database/connections');
exports.queryAllUserRoles = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM user_roles');
        return rows;
    } catch (err) {
        throw new Error('Error fetching user roles: ' + err.message);
    }
}
// exports.queryUserRoleById = async (id) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM user_roles WHERE id = ?', [id]);
//         return rows.length > 0 ? rows[0] : null;
//     } catch (err) {
//         throw new Error('Error fetching user role with ID: ' + id + ' ' + err.message);
//     }
// }
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.queryUserRoleByUserId = async (userId) => {
    try{
        const [rows] = await db.query('SELECT * FROM user_roles WHERE user_id = ?', [userId]);
        const rolesNamesList = [];
        for (const role of rows) {
            const [roleName] = await db.query('SELECT * FROM roles WHERE id = ?', [role.role_id]);
            if (roleName && roleName.length > 0) {
                rolesNamesList.push(roleName[0].role_name);
            }
        }
        if (!rolesNamesList) {
            throw new Error('Role not found for user with ID: ' + userId);
        }
        return rolesNamesList;
    } catch (err) {
        throw new Error('Error fetching user role: ' + err.message);

    }
}
exports.postUserRole = async ( user_id, role_id ) => {
    try {
        const [result] = await db.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [user_id, role_id]
        );
        return { user_id: user_id, role_id: role_id };
    } catch (err) {
        throw new Error('Error posting user role: ' + err.message);
    }
}
exports.deleteUserRole = async (id,userId) => {
    try {
        const [result] = await db.query('DELETE FROM user_roles WHERE user_id = ? and role_id = ?', [userId,id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting user role with ID: ' + id + ' ' + err.message);
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