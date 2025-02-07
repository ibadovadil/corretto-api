const { Category } = require("../models/categoryModel.js");
const { ProductValidator, Product } = require("../models/productModel.js");
const { deleteSingleOldImage, deleteManyOldImages } = require("../utils/deleteOldImage.js");

exports.productListItem = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "-__v -createdAt -updatedAt");
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};

exports.productGetById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate("category", "-__v -createdAt -updatedAt");
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};

exports.productListByPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;

        const skip = (page - 1) * limit;
        const totalProduct = await Product.countDocuments();

        const product = await Product.find().skip(skip).limit(limit);
        res.status(200).json({
            product,
            totalPage: Math.ceil(totalProduct / limit)
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};

exports.productCreate = async (req, res) => {
    try {
        const { error } = ProductValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        else {
            const isExistCategory = await Category.findById(req.body.category);
            if (!isExistCategory) return res.status(400).json({ error: "Category not found" });

            let fileObj = req.files;
            let filesObjLength = Object.keys(fileObj).length;
            if (filesObjLength === 0) {

                const product = new Product(req.body);
                const result = await product.save();
                res.status(201).send(result);
            } else {
                const product = new Product(req.body);
                const uploadFiles = [];
                req.files.images.map(async item => {
                    uploadFiles.push(item.path)
                })
                product.images = uploadFiles;
                product.coverImage = req.files.coverImage[0].path;
                const result = await product.save();
                res.status(201).send(result);
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};

exports.productUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = ProductValidator(req.body);
        if (error) return res.status(400).json({ error: error.message });
        else {
            const isExistCategory = await Category.findById(req.body.category);
            if (!isExistCategory) return res.status(400).json({ error: "Category not found" });

            let product;
            product = await Product.findById(id);
            if (!product) return res.status(404).json({ error: "Product not found" });
            else {
                let fileObj = req.files;
                let filesObjLength = Object.keys(fileObj).length;
                if (filesObjLength === 0) {
                    product = await Product.findByIdAndUpdate(id, { ...req.body });
                    await product.save();
                    res.json(product);
                } else {
                    product = await Product.findByIdAndUpdate(id, { ...req.body });
                    deleteSingleOldImage(product.coverImage);
                    deleteManyOldImages(product.images);
                    const uploadFiles = [];
                    req.files.images.map(async item => {
                        uploadFiles.push(item.path)
                    })
                    product.images = uploadFiles;
                    product.coverImage = req.files.coverImage[0].path;
                    const result = await product.save();
                    res.status(201).send(result);
                }
            }
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};

exports.productDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            error: "Product not found"
        });
        else {
            const product = await Product.findByIdAndDelete(id);
            deleteSingleOldImage(product.coverImage);
            deleteManyOldImages(product.images);
            res.json({ message: "Product deleted successfully" });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Error Occured', details: err.message });
    }
};


