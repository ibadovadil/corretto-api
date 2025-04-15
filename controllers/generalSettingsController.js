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
            const logoDarkPath = req.files.logoDark && req.files.logoDark[0] ? req.files.logoDark[0].path.replace(/\\/g, '/') : null;
            const logoWhitePath = req.files.logoWhite && req.files.logoWhite[0] ? req.files.logoWhite[0].path.replace(/\\/g, '/') : null;

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
        // Validate request body using the generalValidator function
        const { error } = generalValidator(req.body);
        if (error) {
            return res.status(400).send(error.message); // If validation fails, return an error message
        }

        // Retrieve the ID of the item to update from the request params
        let Id = req.params.id;
        let general = await GeneralSettings.findById(Id);
        if (!general) {
            return res.status(404).send("Not Found!"); // If the item is not found, return a 404 error
        }

        let fileObj = req.files; // Get the files from the request
        let filesObjLength = Object.keys(fileObj).length; // Check the number of files uploaded

        if (filesObjLength === 0) {
            // If no files are uploaded, only update the body data
            general = await GeneralSettings.findByIdAndUpdate(
                Id,
                { ...req.body },
                { new: true }
            );
            return res.status(200).send(general); // Return the updated object
        } else {
            // If files are uploaded, delete the old images
            deleteSingleOldImage(general.logoDark);
            deleteSingleOldImage(general.logoWhite);

            // Determine the file paths for the logos, defaulting to the existing ones if no new files are uploaded
            const logoDarkPath = fileObj.logoDark && fileObj.logoDark[0] ? fileObj.logoDark[0].path.replace(/\\/g, '/') : general.logoDark.replace(/\\/g, '/');
            const logoWhitePath = fileObj.logoWhite && fileObj.logoWhite[0] ? fileObj.logoWhite[0].path.replace(/\\/g, '/') : general.logoWhite.replace(/\\/g, '/');

            // Update the item with the new data, including the updated image paths
            general = await GeneralSettings.findByIdAndUpdate(
                Id,
                {
                    ...req.body,
                    logoDark: logoDarkPath,
                    logoWhite: logoWhitePath
                },
                { new: true }
            );
            return res.status(200).json(general); // Return the updated object as JSON
        }
    } catch (error) {
        return res.status(500).send("Error Occurred! " + error.message); // If an error occurs, return a 500 error
    }
};

