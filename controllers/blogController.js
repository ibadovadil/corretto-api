const { Blog, blogValidator } = require("../models/pages/blogModel.js");
const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");
exports.BlogListItem = async (req, res) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving the blog list." });
    }
}

exports.BlogGetById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).send("Blog Not Found");
        res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while retrieving the blog by id." });
    }
}

exports.BlogCreate = async (req, res) => {
    try {
        const { error } = blogValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            const blog = new Blog(req.body);
            if (!req.file) {
                result = await blog.save();
                res.status(201).json(result)
            } else {
                blog.image = req.file.path.replace(/\\/g, '/');
                const result = await blog.save();
                res.status(201).json(result);
            }
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred while creating the blog." });

    }
}

exports.BlogUpdate = async (req, res) => {
    try {
        const { error } = blogValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            let Id = req.params.id;
            let blog = await Blog.findById(Id);
            if (!blog) {
                return res.status(404).send("Blog Not Found!");
            }
            else {
                if (!req.file) {
                    const result = await blog.save();
                    // blog = await Blog.findByIdAndUpdate(Id, { ...req.body })
                    blog = await Blog.findByIdAndUpdate(Id, { ...req.body }, { new: true });

                    res.status(200).send(result);
                } else {
                    await Blog.findByIdAndUpdate(Id, { ...req.body });
                    const oldImage = blog.image;
                    deleteSingleOldImage(oldImage);
                    blog.image = req.file.path.replace(/\\/g, '/');
                    var result = await blog.save();
                    res.status(200).send(result);
                }
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!");
    }
};

exports.DeleteBlog = async (req, res) => {
    try {
        const Id = req.params.id;
        const blog = await Blog.findById(Id);
        if (!blog) {
            return res.status(404).send({ message: "Blog not found" });
        }
        deleteSingleOldImage(blog.image);
        await Blog.findByIdAndDelete(Id);
        res.status(200).send({ message: "Blog deleted" });

    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the blog" });
    }
}