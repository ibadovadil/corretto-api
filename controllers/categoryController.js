const { categoryValidator, Category } = require("../models/categoryModel.js");


exports.CategoryListItem = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.CategoryGetById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) return res.status(404).json({ error: 'Kategori bulunamadı' });
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { error } = categoryValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { error } = categoryValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        const category = await Category.findByIdAndUpdate(categoryId, { ...req.body });
        if (!category) return res.status(404).json({ error: 'Not Found Category.' });
        await category.save();
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send("There is no such data.")
        } else {
            res.status(200).json(category);
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured:', details: err.message });
    }
};