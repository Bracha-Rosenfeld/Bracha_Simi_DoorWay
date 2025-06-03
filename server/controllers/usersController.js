const { queryAllUsers, queryUserByUsername, queryUserById, postUser, queryUserPassword, putUser, deleteUser, queryUserRoleName/*!!!!!!!!!!!*/ } = require('../service/usersService');
const { getCoordinatesFromAddress } = require('../helpers/calculations');
exports.getAllUsers = async (req, res) => {
    try {
        const users = await queryAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await queryUserById(id);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}
exports.createUser = async (req, res) => {
    try {
        const address = req.body.address;
        if (address === null || address === '') {
            return res.status(400).json({ error: 'Address is required' + req.body.address });
        }
        const [latitude, longitude] = await getCoordinatesFromAddress(address);
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
        }
        const user = await postUser(req.body, latitude, longitude);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
    }
}
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const address = req.body.address;
        if (address !== null || address !== '') {
            const [latitude, longitude] = await getCoordinatesFromAddress(address);
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
            }
        }
        const isUpdate = await putUser(id, req.body, latitude, longitude);
        if (!isUpdate) {
            return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
        }
        res.status(200).json('user' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}
exports.removeUser = async (req, res) => {
    try {
        const id = req.params.id;
        const roleArray = await queryUserRoleName(id);/*!!!!!!!!!!!*/
        const role = roleArray[0];
        if (role && role.role_name === 'admin') {
            return res.status(403).json({ error: 'Cannot delete ' + role.role_name + ' user' });
        }
        const isDelete = await deleteUser(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        res.status(200).json('user' + id + ' deleted' + role.role_name);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}
exports.manageLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await queryUserByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User with username:' + username + ' not found' });
        }
        const userPassword = await queryUserPassword(user.id);
        if (!userPassword || userPassword.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}