const { default: mongoose } = require("mongoose");
const { Slider, sliderValidator } = require("../models/home/silderModel.js");
const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

exports.SliderListItem = async (req, res) => {
    const slider = await Slider.find();
    res.status(200).json(slider);
}

exports.SliderGetById = async (req, res) => {
    //? Cast error id=1
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).send('The slider with the given ID was not found.');
    res.status(200).json(slider);
}

exports.SliderCreate = async (req, res) => {
    const { error } = sliderValidator(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }
    else {
        const slider = new Slider(req.body);
        if (!req.file) {
            result = await slider.save();
            res.status(201).json(result)
        } else {
            slider.backgroundImage = req.file.path;
            const result = await slider.save();
            res.status(201).json(result);
        }
    }
}

exports.SliderUpdate = async (req, res) => {
    const { error } = sliderValidator(req.body);
    if (error) {
        return res.status(400).send(error.message);
    } else {
        let Id = req.params.id;
        let slider = await Slider.findById(Id);
        if (!slider) {
            return res.status(404).send("Slider Not Found!");
            
        }
        else {
            if (!req.file) {
                const result = await slider.save();
                slider = await Slider.findByIdAndUpdate(Id, { ...req.body })
                res.status(200).send(result);
            }else{
                await Slider.findByIdAndUpdate(Id, { ...req.body });
                const oldImage = slider.backgroundImage;
                deleteSingleOldImage(oldImage);
                slider.backgroundImage = req.file.path;
                var result = await slider.save();
                res.status(200).send(result);
            }
        }
    }
};

exports.SliderDelete = async (req, res) => {
    const Id = req.params.id;
    const slider = await Slider.findById(Id);
    if (!slider) {
        return res.status(404).send({ message: "Slider not found" });
    }
    deleteSingleOldImage(slider.backgroundImage);
    await Slider.findByIdAndDelete(Id);
    res.status(200).send({ message: "Slider deleted" });
}