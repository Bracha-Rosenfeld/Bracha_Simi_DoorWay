exports.validateSignup = (req, res, next) => {
    const { email, phone, password } = req.body;

    // Check if all fields are provided
    if ( !email || !password || !phone) {
        return res.status(400).json({ error: 'All fields are required. Please fill out all the fields.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format. Please enter a valid email address.' });
    }

    if (/\s/.test(email)) {
        return res.status(400).json({ error: 'Email must not contain spaces. Please check your email.' });
    }

    // // Password validation
    // if (password.length < 8) {
    //     return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    // }

    // if (!/[A-Z]/.test(password)) {
    //     return res.status(400).json({ error: 'Password must contain at least one uppercase letter.' });
    // }

    // if (!/[a-z]/.test(password)) {
    //     return res.status(400).json({ error: 'Password must contain at least one lowercase letter.' });
    // }

    // if (!/[0-9]/.test(password)) {
    //     return res.status(400).json({ error: 'Password must contain at least one number.' });
    // }

    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //     return res.status(400).json({ error: 'Password must contain at least one special character (e.g., !, @, #).' });
    // }

    // if (/\s/.test(password)) {
    //     return res.status(400).json({ error: 'Password must not contain spaces.' });
    // }

    next(); // Proceed to the next middleware or controller
};

exports.validateLogin = (req, res, next) => {
    
    // Check if username and password are provided
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'Email and password are required. Please fill out both fields.' });
    }

    next(); // Proceed to the next middleware or controller
};
