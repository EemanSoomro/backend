const router = require('express').Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
    const ProjectExists = await Project.findOne({name: req.body.name});
    if (ProjectExists) return res.status(400).send('Project Already Exists');
    const newProject = new Project(req.body);
    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.delete('/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.status(200).json('Project has been deleted');
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/find/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/', async (req, res) => {
    const query = req.query.new;
    try {
        const projects = query ? await Project.find().sort({_id: -1}).limit(5) :
        // Sort project on name
        await Project.find().sort({name: 1});

        // Sort project on Name
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

router.get('/search/:search', async (req, res) => {
    try {
        const projects = await Project.find({name: {$regex: req.params.search, $options: 'i'}});
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// Get by Type
router.get('/type/:type', async (req, res) => {
    try {
        const projects = await Project.find({type: req.params.type});
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// Get by Domain
router.get('/domain/:domain', async (req, res) => {
    try {
        const projects = await Project.find({domain: req.params.domain});
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

// Get by Type and Domain
router.get('/type/:type/domain/:domain', async (req, res) => {
    try {
        const projects = await Project.find({type: req.params.type, domain: req.params.domain});
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);

module.exports = router;