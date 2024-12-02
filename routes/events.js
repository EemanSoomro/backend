const router = require('express').Router();
const verify = require('./verifyToken');
const Event = require('../models/Event');
const Society = require('../models/Society');

// ==================== CREATE ====================
router.post('/',  async (req, res) => {
    // IF Event Already Exists in DB then return Error else Save Event
    const eventExists = await Event.findOne ({ name: req.body.name });
    if (eventExists) return res.status(400).send('Event Already Exists');
    const newEvent = new Event(req.body);
    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// ==================== UPDATE ====================
router.put('/:id',  async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== DELETE ====================
router.delete('/:id',  async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json('Event has been deleted');
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ====================
router.get('/find/:id',  async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ALL ====================
router.get('/',  async (req, res) => {
    try {
        const events = await Event.find().sort({name: 1});
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ALL BY Given societyCode ====================
router.get('/findbyCode/:societyCode',  async (req, res) => {
    try {
        const events = await Event.find({ societyCode: req.params.societyCode });
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// ==================== GET ALL BY Given Society Id ====================

router.get('/findbySocietyId/:societyId',  async (req, res) => {
    try {
        const society = await Society.findById(req.params.societyId);
        const events = await Event.find ({ societyCode: society.code });
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);
module.exports = router;