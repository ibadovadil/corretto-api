const { Category } = require("../../models/product/categoryModel.js");
const { ProductValidator, Product } = require("../../models/product/productModel.js");
const { Tag } = require("../../models/product/tagModel.js");
const { deleteSingleOldImage, deleteManyOldImages } = require("../../utils/deleteOldImage.js");

exports.productListItem = async (req, res) => {
    try {
        const products = await Product.find().populate("category", "-__v -createdAt -updatedAt")
            .populate("tags", "-__v -createdAt -updatedAt");
        ;
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
        if (error) {
            res.status(400).json({ error: error.message });
        }
        else {
            const isExistCategory = await Category.findById(req.body.category);
            if (!isExistCategory) {
                res.status(400).json({ error: "Category not found" })
            }
            const isExistTag = await Tag.findById(req.body.tags);
            if (!isExistTag) {
                res.status(400).json({ error: "Tag not found" })
            }
            else {
                let product;
                let result;
                let filesObj = req.files;
                let filesObjLength = Object.keys(filesObj).length;

                if (filesObjLength === 0) {

                    product = new Product(req.body);
                    result = await product.save();
                    res.status(201).send(result);
                } else {
                    const product = new Product(req.body);
                    const uploadFiles = [];

                    req.files.images.forEach(item => {
                        uploadFiles.push(item.path.replace(/\\/g, '/'));
                    });


                    product.images = uploadFiles;
                    product.coverImage = req.files.coverImage[0].path.replace(/\\/g, '/');
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

exports.getProductsByTag = async (req, res) => {
    try {
        const tagId = req.params.tagId;

        const tag = await Tag.findById(tagId);
        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }
        

        const products = await Product.find({ tags: tagId })
            .populate("category", "-__v -createdAt -updatedAt")
            .populate("tags", "-__v -createdAt -updatedAt")
            .exec();
            if (products.length === 0) {
                return res.status(404).json({ error: "No products found for this tag" });
              }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: "Error occurred", details: err.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const catId = req.params.catId;
        const category = await Category.findById(catId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        const products = await Product.find({ category: catId })
            .populate("category", "-__v -createdAt -updatedAt")
            .populate("tags", "-__v -createdAt -updatedAt")
            .exec();
        if (products.length === 0) {
            return res.status(404).json({ error: "No products found for this category" });
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Error occurred", details: err.message });
    }
};