const express = require('express');
const { getAllUserRoles, getUserRoleByRoleName, createUserRole,updateRoleExpiryDate, removeUserRole } = require('../controllers/usersRolesController');
const router = express.Router({ mergeParams: true });
router.get('/', getAllUserRoles);
router.get('/:roleName', getUserRoleByRoleName);
router.post('/', createUserRole);
router.put('/:roleName', updateRoleExpiryDate)
router.delete('/:roleName', removeUserRole);
module.exports = router;
