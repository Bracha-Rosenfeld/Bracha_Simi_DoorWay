const{ queryAllUserRoles, queryUserRoleById, queryUserRoleByUserId, postUserRole, deleteUserRole, queryUserRoleId} = require('../service/usersRolesService');
exports.getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await queryAllUserRoles();
        if (!userRoles || userRoles.length === 0) {
            return res.status(404).json({ error: 'No user roles found' });
        }
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};
// exports.getUserRoleById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const userRole = await queryUserRoleById(id);
//         if (!userRole || userRole.length === 0) {
//             return res.status(404).json({ error: 'User role with id:' + id + ' not found' });
//         }
//         res.status(200).json(userRole);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message });
//     }
// };
/////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
exports.getUserRoleByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userRolesList = await queryUserRoleByUserId(userId);
        if (!userRolesList || userRolesList.length === 0) {
            return res.status(404).json({ error: 'User role with userId:' + userId + ' not found' });
        }
        res.status(200).json(userRolesList);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
};
exports.createUserRole = async (req, res) => {
    try {
        const userRoleName = req.body.role_name;
        const userRoleId = await queryUserRoleId(userRoleName);
        const userRole = await postUserRole(req.body.user_id, userRoleId);
        if (!userRole || userRole.length === 0) {
            return res.status(404).json({ error: 'User role cannot be created' });
        }
        res.status(201).json(userRole);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
    }
};
exports.removeUserRole = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.params.userId;
        if (!id || !userId) {
            return res.status(400).json({ error: 'User role id and user id are required' });
        }
        const isRemoved = await deleteUserRole(id, userId);
        if (!isRemoved) {
            return res.status(404).json({ error: 'User role with id:' + id + ' not found' });
        }
        res.status(200).json('User role with role_id: ' + id + 'and user_id: '+ userId+' removed');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
};