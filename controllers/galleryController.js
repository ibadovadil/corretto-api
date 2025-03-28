const { Gallery, galleryValidator } = require("../models/pages/galleryModel");
const { deleteSingleOldImage } = require("../utils/deleteOldImage");

exports.GalleryListItem = async (req, res) => {
    try {
        const gallery = await Gallery.find();
        res.status(200).json(gallery);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.GalleryCreate = async (req, res) => {
    try {
        const { error } = galleryValidator(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        else {
            const gallery = new Gallery(req.body);
            if (!req.file) {
                result = await gallery.save();
                res.status(201).json(result)
            } else {
                gallery.image = req.file.path.replace(/\\/g, '/');;
                const result = await gallery.save();
                res.status(201).json(result);
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.GalleryUpdate = async (req, res) => {
    try {
        const { error } = galleryValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            let Id = req.params.id;
            let gallery = await Gallery.findById(Id);
            if (!gallery) {
                return res.status(404).send("Gallery Not Found!");
            }
            else {
                if (!req.file) {
                    const result = await gallery.save();
                    gallery = await gallery.findByIdAndUpdate(Id, { ...req.body })
                    res.status(200).send(result);
                } else {
                    await Gallery.findByIdAndUpdate(Id, { ...req.body });
                    const oldImage = gallery.image;
                    deleteSingleOldImage(oldImage);
                    gallery.image = req.file.path.replace(/\\/g, '/');;
                    var result = await gallery.save();
                    res.status(200).send(result);
                }
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!  " + error.message);
    }
};

exports.GalleryDelete = async (req, res) => {
    try {
        const Id = req.params.id;
        const gallery = await Gallery.findById(Id);
        if (!gallery) {
            return res.status(404).send({ message: "Gallery not found" });
        }
        deleteSingleOldImage(gallery.image);
        await Gallery.findByIdAndDelete(Id);
        res.status(200).send({ message: "Gallery deleted" });
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}