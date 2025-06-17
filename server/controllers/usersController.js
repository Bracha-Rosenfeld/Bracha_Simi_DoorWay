const { queryAllUsers, queryUserByEmail, queryUserById, postUser, queryUserPassword, putUser, deleteUser, queryUserRoleName, queryUserRoleId } = require('../service/usersService');
const { getCoordinatesFromAddress } = require('../helpers/calculations');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');


const JWT_SECRET = process.env.JWT_SECRET || 'Bracha_and_Simi_The_Doorway100%';
const VITE_GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;
const client = new OAuth2Client(VITE_GOOGLE_CLIENT_ID);

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
        const user = await postUser(req.body, latitude, longitude, userRoleName);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
        }
        const fullUser = await queryUserById(user.id);

        // Generate JWT token
        const token = jwt.sign(
            {
                id: fullUser.id,
                email: fullUser.email,
                username: fullUser.username,
                phone: fullUser.phone,
                address: fullUser.address,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        return res.status(200).json({ ...fullUser, token });
        //const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
        //res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        //res.status(200).json({ ...user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message + req.body });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        //const address = req.body.address;
        let latitude, longitude;
        if (req.body.address) {
            [latitude, longitude] = await getCoordinatesFromAddress(req.body.address);
            if (isNaN(latitude) || isNaN(longitude)) {
                return res.status(400).json({ error: 'Invalid address coordinates' + req.body.address });
            }
        }
        const isUpdate = await putUser(id, req.body, latitude, longitude);
        if (!isUpdate) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        const updatedUser = await queryUserById(id);
        if (!updatedUser || updatedUser.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        const token = jwt.sign(
            {
                id: updatedUser.id,
                email: updatedUser.email,
                username: updatedUser.username,
                phone: updatedUser.phone,
                address: updatedUser.address,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
        });
        return res.status(200).json({ user: updatedUser, token })

    } catch (error) {
        console.error('updateUser error:', error);
        return res
            .status(500)
            .json({ error: 'Internal server error. ' + error.message });
    }
};

exports.removeUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await queryUserById(id);
        const isDelete = await deleteUser(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        // Send approval email
        const emailSent = await sendUserWasBlockedEmail(user.email, user.username);
        if (!emailSent) {
            console.log('Failed to send approval email');
        } else {
            console.log('Approval email sent successfully');
        }
        res.status(200).json('user' + id + ' deleted');
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
        const fullUser = await queryUserById(user.id);
        // Generate JWT token
        const token = jwt.sign(
            {
                id: fullUser.id,
                email: fullUser.email,
                username: fullUser.username,
                phone: fullUser.phone,
                address: fullUser.address,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        return res.status(200).json({ ...fullUser, token });
        // const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
        // res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        // res.status(200).json({ ...user, token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' + error.message });
    }
}

exports.manageLogout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ message: 'Logged out' });

}
// New endpoint to get current user from token
exports.getCurrentUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await queryUserById(decoded.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(Array.isArray(user) ? user[0] : user);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
exports.googleAuth = async (req, res) => {
    try {
        const idToken = req.body.idToken || req.body.token;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: VITE_GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        let user = await queryUserByEmail(payload.email);

        if (!user) {
            //const roleId = await queryUserRoleId('publisher');
            user = await postUser(
                {
                    username: payload.name,
                    email: payload.email,
                    phone: null,
                    address: null,
                    password: null,     // סיסמה ריקה – משתמש Google
                },
                null, null, 'publisher'
            );
        }
        const fullUser = await queryUserById(user.id);

        const token = jwt.sign(
            {
                id: fullUser.id,
                email: fullUser.email,
                username: fullUser.username,
                phone: fullUser.phone,
                address: fullUser.address,
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        return res.status(200).json({ ...fullUser, token });
        // const token = jwt.sign(
        //     {
        //         id: user.id,
        //         email: user.email,
        //         username: user.username,
        //     },
        //     JWT_SECRET,
        //     { expiresIn: '7d' }
        // );

        // res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
        // res.status(200).json({ ...user, token });

    } catch (err) {
        console.error('googleAuth error:', err);
        return res.status(500).json({ error: 'Internal server error', detail: err.message });
    }
};
