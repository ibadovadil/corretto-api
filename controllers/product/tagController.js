const { Tag, tagValidator } = require('../../models/product/tagModel.js');
exports.TagListItem = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
}

exports.TagGetById = async (req, res) => {
    try {
        const tagId = req.params.id;
        const tag = await Tag.findById(tagId)
        if (!tag) return res.status(404).json({ error: 'Tag not found' });
        res.status(200).json(tag);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.CreateTag = async (req, res) => {
    try {
        const { error } = tagValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        const tag = new Tag(req.body);
        await tag.save();
        res.status(201).json(tag);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.UpdateTag = async (req, res) => {
    try {
        const tagId = req.params.id;
        const { error } = tagValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        const tag = await Tag.findByIdAndUpdate(tagId, { ...req.body });
        if (!tag) return res.status(404).json({ error: 'Not Found Tag.' });
        await tag.save();
        res.status(200).json(tag);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.DeleteTag = async (req, res) => {
    try {
        const tagId = req.params.id;
        const tag = await Tag.findByIdAndDelete(tagId);
        if (!tag) {
            return res.status(404).send("There is no such data.")
        } else {
            res.status(200).json({ message: 'Tag deleted successfully.' });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};