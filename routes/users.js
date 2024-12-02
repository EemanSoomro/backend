const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const verify = require('./verifyToken');

// UPDATE
router.put('/:id', async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can update only your account');
    }
}
);

// DELETE
router.delete('/:id', async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can delete only your account');
    }
}
);

// GET USER
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}
);


// GET ALL USERS
router.get('/', async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(6) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}
);

// GET USER STATS
router.get('/stats', async (req, res) => {
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: '$createdAt' },
                }
            },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1 },
                }
            },
        ]);
        res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// Change Password
router.put('/changePassword/:id', async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
        }
        try {
            const user = await User.findById(req.params.id);
            if (user) {
                if (CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8) === req.body.oldPassword) {
                    user.password = req.body.password;
                    await user.save();
                    res.status(200).json('Password has been changed');
                } else {
                    res.status(403).json('Wrong password');
                }
            } else {
                res.status(404).json('User not found');
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json('You can update only your account');
    }
}
);




module.exports = router;