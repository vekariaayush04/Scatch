const {Router} = require('express')
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const User = require('../../models/user.model');

const router = Router();

// Signup route
router.post('/signup', async (req, res) => {
    const {username, email , password} = req.body;

    try {

        const existingUser = await User.findOne({
            username
        });
        console.log(existingUser);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = new User({ username:username, password: hashedPassword , email });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error'+ err});
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = compare(password, password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports ={router};
