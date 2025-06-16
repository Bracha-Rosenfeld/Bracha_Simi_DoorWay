const { queryAllUserRoles, queryUserRoleByRoleName, postUserRole, putUserRoleExpiryDate, deleteUserRole } = require('../service/usersRolesService');
const { queryUserById } = require('../service/usersService');
const { sendSubsciptionEmail, sendExtandSubsciptionEmail } = require('../helpers/mailer');
exports.getAllUserRoles = async (req, res) => {
    try {
        const id = req.params.userId;
        const userRoles = await queryAllUserRoles(id);
        if (!userRoles || userRoles.length === 0) {
            return res.status(404).json({ error: 'No roles found for user with id' + id });
        }
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};
exports.getUserRoleByRoleName = async (req, res) => {
    try {
        const userId = req.params.userId;
        const roleName = req.params.roleName;
        const userRolesList = await queryUserRoleByRoleName(userId, roleName);
        if (!userRolesList || userRolesList.length === 0) {
            return res.status(404).json({ error: 'User role ' + roleName + 'with userId:' + userId + ' not found' });
        }
        res.status(200).json(userRolesList);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
};
exports.createUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const roleName = req.body.role_name;
        const expiryDate = req.body.expiry_date;
        const userRole = await postUserRole(userId, roleName, expiryDate);
        if (!userRole || userRole.length === 0) {
            return res.status(404).json({ error: 'User role cannot be created' });
        }
        if (roleName === 'viewer') {          
            const viewer = await queryUserById(userId);            
            const emailSent = await sendSubsciptionEmail(viewer.email, viewer.username, expiryDate);
            if (!emailSent) {
                console.log('Failed to send approval email');
            } else {
                console.log('Approval email sent successfully');
            }
        }
        res.status(201).json(userRole);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
    }
};
exports.updateRoleExpiryDate = async (req, res) => {
    const userId = req.params.userId;
    const roleName = req.params.roleName;
    const numOfDaysToAdd = req.body.num_of_days;
    if (!roleName || !userId) {
        return res.status(400).json({ error: 'User role name and user id are required' });
    }
    try {
        const isUpdated = await putUserRoleExpiryDate(userId, roleName, numOfDaysToAdd);
        if (!isUpdated) {
            return res.status(404).json({ error: 'User role:' + roleName + ' not found for user wth id ' + userId });
        }
        const viewer = await queryUserById(userId);
        const userRole = await queryUserRoleByRoleName(userId, roleName);
        const emailSent = await sendExtandSubsciptionEmail(viewer.email, viewer.username, numOfDaysToAdd, userRole.expiry_date);
        if (!emailSent) {
            console.log('Failed to send approval email');
        } else {
            console.log('Approval email sent successfully');
        }
        res.status(200).json('User role : ' + roleName + ' for user with id: ' + userId + ' has been updted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}
exports.removeUserRole = async (req, res) => {
    try {
        const userId = req.params.userId;
        const roleName = req.params.roleName;
        if (!roleName || !userId) {
            return res.status(400).json({ error: 'User role name and user id are required' });
        }
        const isRemoved = await deleteUserRole(userId, roleName);
        if (!isRemoved) {
            return res.status(404).json({ error: 'User role:' + roleName + ' not found for user wth id ' + userId });
        }
        res.status(200).json('User role : ' + roleName + ' for user with id: ' + userId + ' has been removed');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
};