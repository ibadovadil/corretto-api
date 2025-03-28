const { HeroTitle, heroTitleValidator } = require("../models/home/heroTitleModel.js");
const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

exports.HeroTitleListItem = async (req, res) => {
    try {
        const heroTitle = await HeroTitle.find();
        res.status(200).json(heroTitle);
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);

    }
}

exports.HeroTitleGetById = async (req, res) => {
    try {
        const heroTitle = await HeroTitle.findById(req.params.id);
        if (!heroTitle) {
            return res.status(404).json({ message: "Hero Title Not Found" });
        }
        res.status(200).json(heroTitle);
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);

    }
}
exports.HeroTitleCreate = async (req, res) => {
    try {
        const { error } = heroTitleValidator(req.body)
        if (error) {
            return res.status(400).send(error.message);
        } else {
            const existingCount = await HeroTitle.countDocuments();
            if (existingCount >= 4) {
                return res.status(400).json({ message: "A maximum of 4 records can be created." });
            } else {

                const heroTitle = new HeroTitle(req.body);
                if (!req.file) {
                    result = await heroTitle.save();
                    return res.status(201).json(result);
                } else {
                    heroTitle.coverImage = req.file.path.replace(/\\/g, '/');;
                    const result = await heroTitle.save();
                    return res.status(201).json(result);
                }
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}

exports.HeroTitleUpdate = async (req, res) => {
    try {
        const { error } = heroTitleValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            let Id = req.params.id;
            let heroTitle = await HeroTitle.findById(Id);
            if (!heroTitle) {
                return res.status(404).send("Hero Title Not Found!");
            } else {
                if (!req.file) {
                    const result = await heroTitle.save();
                    heroTitle = await HeroTitle.findByIdAndUpdate(Id, { ...req.body });
                    res.status(200).send(result);
                } else {
                    await HeroTitle.findByIdAndUpdate(Id, { ...req.body });
                    const oldImage = heroTitle.coverImage;
                    deleteSingleOldImage(oldImage);
                    heroTitle.coverImage = req.file.path.replace(/\\/g, '/');;
                    var result = await heroTitle.save();
                    res.status(200).send(result);
                }
            }
        }
    }
    catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}

exports.HeroTitleDelete = async (req, res) => {
    try {
        const Id = req.params.id;
        const heroTitle = await HeroTitle.findById(Id);
        if (!heroTitle) {
            return res.status(404).send({ message: "Hero title not found" });
        } else {
            deleteSingleOldImage(heroTitle.coverImage);
            await HeroTitle.findByIdAndDelete(Id);
            res.status(200).send({ message: "Hero title deleted" });
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}

