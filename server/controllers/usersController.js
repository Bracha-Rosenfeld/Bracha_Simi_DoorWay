// const { queryAllUsers, queryUserByEmail, queryUserById, postUser, queryUserPassword, putUser, deleteUser, queryUserRoleName/*!!!!!!!!!!!*/, queryUserRoleId /*!!!!!!!!!!!!*/ } = require('../service/usersService');
// const { getCoordinatesFromAddress } = require('../helpers/calculations');
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await queryAllUsers();
//         if (!users || users.length === 0) {
//             return res.status(404).json({ error: 'No users found' });
//         }
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error. ' + error.message });
//     }
// };

// exports.getUserById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const user = await queryUserById(id);
//         if (!user || user.length === 0) {
//             return res.status(404).json({ error: 'User with id:' + id + ' not found' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message });
//     }
// }
// exports.createUser = async (req, res) => {
//     try {
//         const address = req.body.address;
//         if (address === null || address === '') {
//             return res.status(400).json({ error: 'Address is required' + req.body.address });
//         }
//         const [latitude, longitude] = await getCoordinatesFromAddress(address);
//         if (isNaN(latitude) || isNaN(longitude)) {
//             return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
//         }
//         const userRoleName = req.body.role_name;
//         const userRoleId = await queryUserRoleId(userRoleName);
//         console.log('userRoleId', userRoleId);
//         const user = await postUser(req.body, latitude, longitude, userRoleId);
//         if (!user || user.length === 0) {
//             return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
//     }
// }
// exports.updateUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const address = req.body.address;
//         if (address !== null || address !== '') {
//             const [latitude, longitude] = await getCoordinatesFromAddress(address);
//             if (isNaN(latitude) || isNaN(longitude)) {
//                 return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
//             }
//         }
//         const isUpdate = await putUser(id, req.body, latitude, longitude);
//         if (!isUpdate) {
//             return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
//         }
//         res.status(200).json('user' + id + ' updated');
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message });
//     }
// }
// exports.removeUser = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const roleArray = await queryUserRoleName(id);/*!!!!!!!!!!!*/
//         const role = roleArray[0];
//         if (role && role.role_name === 'admin') {
//             return res.status(403).json({ error: 'Cannot delete ' + role.role_name + ' user' });
//         }
//         const isDelete = await deleteUser(id);
//         if (!isDelete) {
//             return res.status(404).json({ error: 'User with id:' + id + ' not found' });
//         }
//         res.status(200).json('user' + id + ' deleted' + role.role_name);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message });
//     }
// }
// exports.manageLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await queryUserByEmail(email);
//         if (!user) {
//             return res.status(404).json({ error: 'User with email:' + email + ' not found' });
//         }
//         const userPassword = await queryUserPassword(user.id);
//         if (!userPassword || userPassword.password !== password) {
//             return res.status(401).json({ error: 'Invalid credentials' + userPassword.password + ' ' + password });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error.' + error.message });
//     }
// }


const { queryAllUsers, queryUserByEmail, queryUserById, postUser, queryUserPassword, putUser, deleteUser, queryUserRoleName, queryUserRoleId } = require('../service/usersService');
const { getCoordinatesFromAddress } = require('../helpers/calculations');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'Bracha_and_Simi_The_Doorway100%';

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
        const userRoleName = req.body.role_name;
        const userRoleId = await queryUserRoleId(userRoleName);
        const user = await postUser(req.body, latitude, longitude, userRoleId);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role_id: user.role_id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        res.status(200).json({ ...user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const address = req.body.address;
        let latitude, longitude;
        if (address !== null || address !== '') {
            [latitude, longitude] = await getCoordinatesFromAddress(address);
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
            }
        }
        const isUpdate = await putUser(id, req.body, latitude, longitude);
        if (!isUpdate) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        res.status(200).json('user' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}

exports.removeUser = async (req, res) => {
    try {
        const id = req.params.id;
        const roleArray = await queryUserRoleName(id);
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
        const { email, password } = req.body;
        const user = await queryUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User with email:' + email + ' not found' });
        }
        const userPassword = await queryUserPassword(user.id);
        if (!userPassword || userPassword.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, username: user.username, role_id: user.role_id }, JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        res.status(200).json({ ...user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}

exports.manageLogout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
  res.status(200).json({ message: 'Logged out' });
  
}
// New endpoint to get current user from token
exports.getCurrentUser = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json(decoded);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}