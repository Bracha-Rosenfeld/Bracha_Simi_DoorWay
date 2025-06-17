const jwt = require('jsonwebtoken');

exports.validateSignup = (req, res, next) => {
    const { email, password } = req.body;

  
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required. Please fill out all the fields.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Please enter a valid email address.' });
    }

    if (/\s/.test(email)) {
        return res.status(400).json({ error: 'Email must not contain spaces. Please check your email.' });
    }

    next();
};

exports.validateLogin = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Email and password are required. Please fill out both fields.' });
    }

    next();
};

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};