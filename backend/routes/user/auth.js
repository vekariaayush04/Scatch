const { Router } = require('express');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { z } = require('zod');
const User = require('../../models/user.model');

const router = Router();
const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().regex(pattern, { message: "Password must be at least 8 characters long, contain at least one letter, one number, and one special character (!@#$%^&*)." })
});

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" })
});

// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    const validSchema = signupSchema.safeParse({ username, email, password });
    if (!validSchema.success) {
        return res.status(400).json({ message: validSchema.error.issues[0].message });
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, email });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const validSchema = loginSchema.safeParse({ email, password });
    if (!validSchema.success) {
        return res.status(400).json({ message: 'Invalid SignIn Credentials' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

module.exports = { router };
