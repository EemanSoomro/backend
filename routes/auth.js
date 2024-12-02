const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// 1. REGISTER
// 2. LOGIN

// ==================== REGISTER ====================
router.post('/register', async (req, res) => {
    // Check if the username or email already exists
    const username = await User.findOne({
        username: req.body.username
    });
    const email
    = await User.findOne({
        email: req.body.email
    });
    if (username || email) {
        return res.status(400).json('Username or email already exists');
    }
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== LOGIN ====================
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username : req.body.username });
        if(!user){
            return res.status(401).json('Wrong username or password');
        }
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(originalPassword !== req.body.password){
            return res.status(401).json('Wrong username or password');
        } 
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30 * 12)
        },
        process.env.PASS_SEC);
        const { password, ...others } = user._doc;
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30 * 12
        });
        return res.status(200).json({...others, accessToken});
    } catch (err) {
        return res.status(500).json(err);
    }
});



// Export the router
module.exports = router; 