// routes/societies.js

const router = require('express').Router();
const Society = require('../models/Society');

// ==================== CREATE ====================
router.post('/', async (req, res) => {
    // Check if Society Already Exists in DB
    const societyExists = await Society.findOne({ name: req.body.name });
    if (societyExists) return res.status(400).send('Society Already Exists');
    const newSociety = new Society({
        ...req.body
    });

    try {
        const savedSociety = await newSociety.save();
        res.status(200).json(savedSociety);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ==================== UPDATE ====================
router.put('/:id', async (req, res) => {
    try {
        const updatedSociety = await Society.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedSociety);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ==================== DELETE ====================
router.delete('/:id', async (req, res) => {
    try {
        await Society.findByIdAndDelete(req.params.id);
        res.status(200).json('Society has been deleted');
    } catch (err) {
        res.status(500).json(err);
    }
});

// ==================== GET ====================
router.get('/find/:id', async (req, res) => {
    try {
        const society = await Society.findById(req.params.id);
        res.status(200).json(society);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ==================== GET ALL ====================
router.get('/', async (req, res) => {
    const query = req.query.new;
    if (query) {
        try {
            // Get 5 Random Societies
            const societies = await Society.aggregate([
                { $sample: { size: 5 } },
            ]);
            res.status(200).json(societies);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        try {
            const societies = await Society.find().sort({ name: 1 });
            res.status(200).json(societies);
        } catch (err) {
            res.status(500).json(err);
        }
    }
});

// ==================== SEARCH ====================
router.get('/search/:name', async (req, res) => {
    try {
        const societies = await Society.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(societies);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ==================== GET RANDOM ====================
router.get('/random', async (req, res) => {
    // Get Any Random Society Data
    const type = req.query.type;
    let society;
    try {
        if (type === 'new') {
            society = await Society.aggregate([
                { $sample: { size: 1 } },
            ]);
        } else {
            society = await Society.aggregate([
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(society);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
