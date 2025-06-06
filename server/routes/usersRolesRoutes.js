const express = require('express');
const { getAllUserRoles, getUserRoleById, getUserRoleByUserId,createUserRole, removeUserRole } = require('../controllers/usersRolesController');
const router = express.Router();
router.get('/', getAllUserRoles);
//router.get('/:id', getUserRoleById);
router.get('/:userId', getUserRoleByUserId);//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/', createUserRole);
router.delete('/:id/:userId', removeUserRole);
module.exports = router;
