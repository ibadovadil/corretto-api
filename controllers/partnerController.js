const { default: mongoose } = require("mongoose");
const { Partner, partnerValidator } = require("../models/home/partnerModel.js");
const { deleteSingleOldImage } = require("../utils/deleteOldImage.js");

exports.PartnerListItem = async (req, res) => {
    try {
        const partner = await Partner.find();
        res.status(200).json(partner)
    } catch (error) {
        return res.status(500).send("Error Ocurred!");
    };
}

exports.PartnerGetById = async (req, res) => {
    try {
        const partner = await Partner.findById(req.params.id);
        if (!partner) return res.status(404).send('The partner with the given ID was not found.');
        res.status(200).json(partner);
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}

exports.PartnerCreate = async (req, res) => {
    try {
        const { error } = partnerValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }
        else {
            const partner = new Partner(req.body);
            if (!req.file) {
                result = await partner.save();
                res.status(201).json(result)
            } else {
                partner.image = req.file.path.replace(/\\/g, '/');;
                const result = await partner.save();
                res.status(201).json(result);
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}

exports.PartnerUpdate = async (req, res) => {
    try {
        const { error } = partnerValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        } else {
            let Id = req.params.id;
            let partner = await Partner.findById(Id);
            if (!partner) {
                return res.status(404).send("Partner Not Found!");
            }
            else {
                if (!req.file) {
                    const result = await partner.save();
                    partner = await Partner.findByIdAndUpdate(Id, { ...req.body })
                    res.status(200).send(result);
                } else {
                    await Partner.findByIdAndUpdate(Id, { ...req.body });
                    const oldImage = partner.image;
                    deleteSingleOldImage(oldImage);
                    partner.image = req.file.path.replace(/\\/g, '/');
                    var result = await partner.save();
                    res.status(200).send(result);
                }
            }
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
};



exports.PartnerDelete = async (req, res) => {
    try {
        const Id = req.params.id;
        const partner = await Partner.findById(Id);
        if (!partner) {
            return res.status(404).send({ message: "Partner not found" });
        }
        deleteSingleOldImage(partner.image);
        await Partner.findByIdAndDelete(Id);
        res.status(200).send({ message: "Partner deleted" });
    } catch (error) {
        return res.status(500).send("Error Ocurred!  :" + error.message);
    }
}