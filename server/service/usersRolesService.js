const db = require('../../database/connections');
const { queryUserRoleId, queryUserRoleName } = require('../helpers/helpers')
exports.queryAllUserRoles = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM user_roles WHERE user_id = ?', [id]);
        const rolesNamesList = [];
        for (const role of rows) {
            const [roleName] = await queryUserRoleName(role.role_id);
            if (roleName) {
                rolesNamesList.push(roleName.role_name);
            }
        }
        if (!rolesNamesList) {
            throw new Error('Role not found for user with ID: ' + userId);
        }
        return rolesNamesList;
    } catch (err) {
        throw new Error('Error fetching user roles: ' + err.message);
    }
}
exports.queryUserRoleByRoleName = async (userId, roleName) => {
    try {
        const role_id = await queryUserRoleId(roleName);
        const [rows] = await db.query('SELECT * FROM user_roles WHERE user_id = ? and role_id = ?', [userId, role_id]);
        return rows;

    } catch (err) {
        throw new Error('Error fetching user role: ' + err.message);

    }
}
exports.postUserRole = async (userId, roleName) => {
    try {
        const roleId = await queryUserRoleId(roleName);
        const [result] = await db.query(
            'INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)',
            [userId, roleId]
        );
        return { user_id: userId, role_id: roleId };
    } catch (err) {
        throw new Error('Error posting user role: ' + err.message);
    }
}
exports.putUserRoleExpiryDate = async (userId, roleName, numOfDaysToAdd) => {
    try {
        const roleId = await queryUserRoleId(roleName);
        const [result] = await db.query(
            `UPDATE user_roles 
         SET expiry_date = DATE_ADD(expiry_date, INTERVAL ? DAY) 
         WHERE user_id = ? AND role_id = ?`,
            [numOfDaysToAdd, userId, roleId]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating user role expiry: ' + roleName + ' for user with ID: ' + userId + ' ' + err.message);
    }

}
exports.deleteUserRole = async (userId, roleName) => {
    try {
        const roleId = await queryUserRoleId(roleName);
        const [result] = await db.query('DELETE FROM user_roles WHERE user_id = ? and role_id = ?', [userId, roleId]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting user role: ' + roleName + ' for user with ID: ' + userId + ' ' + err.message);
    }
}

exports.deleteAllUserRole = async (userId) => {
    try {
        const [result] = await db.query('DELETE FROM user_roles WHERE user_id = ?', [userId]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting user roles: for user with ID: ' + userId + ' ' + err.message);
    }
}
