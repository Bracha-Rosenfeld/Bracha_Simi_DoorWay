const {queryAllUsers, queryUserByUsername, queryUserById, postUser,queryUserPassword /*putUser, deleteUser*/} = require('../service/usersService');
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
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createUser = async (req, res) => {
    try {
        const user = await postUser(req.body);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const isUpdate = await putUser(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
        }
        res.status(200).json('user' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removeUser = async (req, res) => {
    try {
        const id = req.params.id
        const isDelete = await deleteUser(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
        }
        res.status(200).json('user' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
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
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}