const db = require('../../database/connections')
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
};
exports.queryUserRoleName = async (roleId) => {
    try {
        const [roleName] = await db.query('SELECT * FROM roles WHERE id = ?', [roleId]);
        if (roleName && roleName.length > 0)
            return roleName;
        else
            throw new Error('No roles found with Id ' + roleId);
    } catch (err) {
        throw new Error('Error fetching role: ' + err.message);
    }

}
//can't be in cartService because it causes a circular dependency between cartService and apartmentService.
exports.deleteAllFavoritesByAptId = async (apartmentId) => {
    try {
        const [result] = await db.query('DELETE FROM carts WHERE apartment_id = ?', [apartmentId]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting favorite with ID: ' + id + ' ' + err.message);
    }
}