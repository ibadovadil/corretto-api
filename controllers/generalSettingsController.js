const { GeneralSettings, generalValidator } = require("../models/generalSettingsModel");
const { deleteManyOldImages, deleteSingleOldImage } = require("../utils/deleteOldImage");

exports.GeneralListItem = async (req, res) => {
    try {
        const general = await GeneralSettings.find();
        res.status(200).json(general);
    } catch (error) {
        return res.status(500).send("Error Ocurred!");
    }
}

exports.GeneralCreate = async (req, res) => {
    try {
        const { error } = generalValidator(req.body);
        if (error) {
            res.status(400).send(error.message)
        } else {
            const logoDarkPath = req.files.logoDark ? req.files.logoDark[0].path : null;
            const logoWhitePath = req.files.logoWhite ? req.files.logoWhite[0].path : null;

            const general = new GeneralSettings({
                ...req.body,
                logoDark: logoDarkPath,
                logoWhite: logoWhitePath
            });
            const result = await general.save();
            res.status(201).json(result);
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred! " + error.message);
    }
}

exports.GeneralUpdate = async (req, res) => {
    try {
        const { error } = generalValidator(req.body);
        if (error) {
            return res.status(400).send(error.message);
        }

        let Id = req.params.id;
        let general = await GeneralSettings.findById(Id);
        if (!general) {
            return res.status(404).send("Not Found!");
        }
        let fileObj = req.files;
        let filesObjLength = Object.keys(fileObj).length;

        if (filesObjLength === 0) {
            general = await GeneralSettings.findByIdAndUpdate(
                Id,
                { ...req.body },
                { new: true }
            );
            return res.status(200).send(general);
        } else {
            deleteSingleOldImage(general.logoDark);
            deleteSingleOldImage(general.logoWhite);

            const logoDarkPath = fileObj.logoDark ? fileObj.logoDark[0].path : general.logoDark;
            const logoWhitePath = fileObj.logoWhite ? fileObj.logoWhite[0].path : general.logoWhite;

            general = await GeneralSettings.findByIdAndUpdate(
                Id,
                {
                    ...req.body,
                    logoDark: logoDarkPath,
                    logoWhite: logoWhitePath
                },
                { new: true }
            );
            return res.status(201).json(general);
        }
    } catch (error) {
        return res.status(500).send("Error Ocurred! " + error.message);
    }
};
