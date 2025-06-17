const express = require('express');
const { getAllUserRoles, getUserRoleByRoleName, createUserRole, updateRoleExpiryDate, removeUserRole } = require('../controllers/usersRolesController');
const { verifyToken } = require('../helpers/middelware');
const router = express.Router({ mergeParams: true });
router.get('/', verifyToken, getAllUserRoles);
router.get('/:roleName', verifyToken, getUserRoleByRoleName);
router.post('/', verifyToken, createUserRole);
router.put('/:roleName', verifyToken, updateRoleExpiryDate)
router.delete('/:roleName', verifyToken, removeUserRole);
module.exports = router;
