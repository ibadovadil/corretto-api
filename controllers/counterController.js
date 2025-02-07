const { counterValidator, Counter } = require('../models/home/counterModel.js');

exports.CounterListItem = async (req, res) => {
    const counter = await Counter.find();
    res.status(200).json(counter);
}

exports.CounterGetById = async (req, res) => {
    const counter = await Counter.findById(req.params.id);
    res.status(200).json(counter);
}

exports.CounterCreate = async (req, res) => {
    try {
        const { error } = counterValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            const existingCount = await Counter.countDocuments();
            if (existingCount >= 4) {
                return res.status(400).json({ message: "A maximum of 4 records can be created." });
            } else {
                const counter = new Counter(req.body);
                result = await counter.save();
                res.status(201).json(result)
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!");
    }
}

exports.CounterUpdate = async (req, res) => {
    try {
        const { error } = counterValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }
        const counter = await Counter.findByIdAndUpdate(req.params.id, { ...req.body });
        result = await counter.save();
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).send("Error Ocurred!");
    }
}

exports.CounterDelete = async (req, res) => {
    try {
        const counter = await Counter.findByIdAndDelete(req.params.id);
        if (!counter) {
            return res.status(404).send("Counter not found!");
        }
        res.status(200).json(counter);
    } catch (error) {
        return res.status(500).send("Error Ocurred!");
    }
};