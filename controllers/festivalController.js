const FestivalModel = require('../models/festivalSchema.js'); 
const logger = require('../logger'); 
const { TAMIL_MESSAGE, ENGLISH_MESSAGE, STATUS_CODES, FILE_UPLOAD } = require("../util/constant.js"); 
const upload = require('../middleware/upload'); 

// Create a new item
const createItem = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            logger.error('Error uploading files', { error: err.message });
            return res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: FILE_UPLOAD.UPLOAD_ERROR,
                status: "error"
            });
        }

        try {
            // Helper function to extract file metadata
            const processFiles = (files) => {
                return files.map(file => ({
                    fileName: file.originalname,
                    fileType: file.mimetype,
                    filePath: file.path,
                    fileSize: file.size
                }));
            };

            const newItem = new FestivalModel({
                ...req.body,
                image: req.files['image'] ? processFiles(req.files['image'])[0] : undefined,
                gallery_images: req.files['gallery_images'] ? processFiles(req.files['gallery_images']) : [],
                video: req.files['video'] ? processFiles(req.files['video']) : []
            });

            await newItem.save();
            logger.info('Item created', { item: newItem });

            const successMessage = req.body.lang === "TA" ? TAMIL_MESSAGE.CREATE_SUCC : ENGLISH_MESSAGE.CREATE_SUCC;
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: successMessage,
                data: newItem,
                status: "success"
            });

        } catch (error) {
            logger.error('Error creating item', { error: error.message });
            const failMessage = req.body.lang === "TA" ? TAMIL_MESSAGE.CREATE_FAIL : ENGLISH_MESSAGE.CREATE_FAIL;
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: failMessage,
                status: "error"
            });
        }
    });
};

// Retrieve all CMS items (only select specific fields)
const getAllCmsItems = async (req, res) => {
    try {
        const selectedValue = 'title_en title_ta description_en description_ta date_en date_ta image video gallery_images isDisabled _id heading_en heading_ta subHeading_en subHeading_ta specialChairman_en specialChairman_ta specialChairmanName_en specialChairmanName_ta minister_en minister_ta chairman_en chairman_ta chairmanName_en chairmanName_ta generalSecretary_en generalSecretary_ta generalSecretaryName_en generalSecretaryName_ta'; 

        const items = await FestivalModel.find({}, selectedValue);
        logger.info('Retrieved all CMS items');

        res.status(STATUS_CODES.SUCCESS).send({
            code: STATUS_CODES.SUCCESS,
            message: ENGLISH_MESSAGE.GET_SUCC,
            data: items,
            status: "success"
        });

    } catch (error) {
        logger.error('Error retrieving CMS items', { error: error.message });

        res.status(STATUS_CODES.SERVER_ERROR).send({
            code: STATUS_CODES.SERVER_ERROR,
            message: ENGLISH_MESSAGE.GET_FAIL,
            status: "error"
        });
    }
};

// Retrieve all items (based on language preference)
const getAllItems = async (req, res) => {
    try {
        let selectedValue;
        if (req.query.lang === "TA") {
            selectedValue = 'title_ta description_ta date_ta image video gallery_images isDisabled _id heading_ta subHeading_ta specialChairman_ta specialChairmanName_ta minister_ta chairman_ta chairmanName_ta generalSecretary_ta generalSecretaryName_ta';
        } else {
            selectedValue = 'title_en description_en date_en image video gallery_images isDisabled _id heading_en subHeading_en specialChairman_en specialChairmanName_en minister_en chairman_en chairmanName_en generalSecretary_en generalSecretaryName_en';
        }

        const items = await FestivalModel.find({}, selectedValue);
        logger.info('Retrieved all items');

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: TAMIL_MESSAGE.GET_SUCC,
                data: items,
                status: "success"
            });
        } else {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: ENGLISH_MESSAGE.GET_SUCC,
                data: items,
                status: "success"
            });
        }

    } catch (error) {
        logger.error('Error retrieving items', { error: error.message });

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: TAMIL_MESSAGE.GET_FAIL,
                status: "error"
            });
        } else {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: ENGLISH_MESSAGE.GET_FAIL,
                status: "error"
            });
        }
    }
};

// Retrieve an item by ID (based on language preference)
const getItemById = async (req, res) => {
    try {
        let selectedValue;
        if (req.query.lang === "TA") {
            selectedValue = 'title_ta description_ta date_ta image video gallery_images isDisabled _id heading_ta subHeading_ta specialChairman_ta specialChairmanName_ta minister_ta chairman_ta chairmanName_ta generalSecretary_ta generalSecretaryName_ta';
        } else {
            selectedValue = 'title_en description_en date_en image video gallery_images isDisabled _id heading_en subHeading_en specialChairman_en specialChairmanName_en minister_en chairman_en chairmanName_en generalSecretary_en generalSecretaryName_en';
        }

        const item = await FestivalModel.findById(req.params.id, selectedValue);

        if (!item) {
            logger.warn('Item not found', { id: req.params.id });

            if (req.query.lang === "TA") {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    code: STATUS_CODES.NOT_FOUND,
                    message: TAMIL_MESSAGE.GET_BY_ID_FAIL,
                    status: "error"
                });
            } else {
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    code: STATUS_CODES.NOT_FOUND,
                    message: ENGLISH_MESSAGE.GET_BY_ID_FAIL,
                    status: "error"
                });
            }
        }

        logger.info('Retrieved item by ID', { item });

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: TAMIL_MESSAGE.GET_BY_ID_SUCC,
                data: item,
                status: "success"
            });
        } else {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: ENGLISH_MESSAGE.GET_BY_ID_SUCC,
                data: item,
                status: "success"
            });
        }

    } catch (error) {
        logger.error('Error retrieving item', { error: error.message });

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: TAMIL_MESSAGE.GET_BY_ID_FAIL,
                status: "error"
            });
        } else {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: ENGLISH_MESSAGE.GET_BY_ID_FAIL,
                status: "error"
            });
        }
    }
};

// Update an existing item
const updateItem = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            logger.error('Error uploading files', { error: err.message });
            return res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: FILE_UPLOAD.UPLOAD_ERROR,
                status: "error"
            });
        }

        try {
            // Helper function to extract file metadata
            const processFiles = (files) => {
                return files.map(file => ({
                    fileName: file.originalname,
                    fileType: file.mimetype,
                    filePath: file.path,
                    fileSize: file.size
                }));
            };

            const updateData = { ...req.body };
            if (req.files) {
                updateData.image = req.files['image'] ? processFiles(req.files['image'])[0] : undefined;
                updateData.gallery_images = req.files['gallery_images'] ? processFiles(req.files['gallery_images']) : [];
                updateData.video = req.files['video'] ? processFiles(req.files['video']) : [];
            }

            const item = await FestivalModel.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true, runValidators: true }
            );

            if (!item) {
                logger.warn('Item not found for update', { id: req.params.id });
                const failMessage = req.query.lang === "TA" ? TAMIL_MESSAGE.UPDATE_FAIL : ENGLISH_MESSAGE.UPDATE_FAIL;
                return res.status(STATUS_CODES.NOT_FOUND).send({
                    code: STATUS_CODES.NOT_FOUND,
                    message: failMessage,
                    status: "error"
                });
            }

            const selectedValue = req.query.lang === "TA"
                ? 'title_ta description_ta date_ta image gallery_images video gallery_images isDisabled _id heading_ta subHeading_ta specialChairman_ta specialChairmanName_ta minister_ta chairman_ta chairmanName_ta generalSecretary_ta generalSecretaryName_ta'
                : 'title_en description_en date_en image gallery_images video gallery_images isDisabled _id heading_en subHeading_en specialChairman_en specialChairmanName_en minister_en chairman_en chairmanName_en generalSecretary_en generalSecretaryName_en';

            const updatedItem = await FestivalModel.findById(req.params.id, selectedValue);
            logger.info('Updated item', { item: updatedItem });

            const successMessage = req.query.lang === "TA" ? TAMIL_MESSAGE.UPDATE_SUCC : ENGLISH_MESSAGE.UPDATE_SUCC;
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: successMessage,
                data: updatedItem,
                status: "success"
            });

        } catch (error) {
            logger.error('Error updating item', { error: error.message });
            const failMessage = req.query.lang === "TA" ? TAMIL_MESSAGE.UPDATE_FAIL : ENGLISH_MESSAGE.UPDATE_FAIL;
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: failMessage,
                status: "error"
            });
        }
    });
};

// Delete an item
const deleteItem = async (req, res) => {
    try {
        let selectedFields;

        if (req.query.lang === "TA") {
            selectedFields = 'title_ta description_ta date_ta image video gallery_images isDisabled _id heading_ta subHeading_ta specialChairman_ta specialChairmanName_ta minister_ta chairman_ta chairmanName_ta generalSecretary_ta generalSecretaryName_ta';
        } else {
            selectedFields = 'title_en description_en date_en image video gallery_images isDisabled _id heading_en subHeading_en specialChairman_en specialChairmanName_en minister_en chairman_en chairmanName_en generalSecretary_en generalSecretaryName_en';
        }

        const dltitem = await FestivalModel.findById(req.params.id).select(selectedFields);

        if (!dltitem) {
            logger.warn('Item not found for deletion', { id: req.params.id });

            if (req.query.lang === "TA") {
                res.status(STATUS_CODES.NOT_FOUND).send({
                    code: STATUS_CODES.NOT_FOUND,
                    message: TAMIL_MESSAGE.DELETE_FAIL,
                    status: "error"
                });
            } else {
                res.status(STATUS_CODES.NOT_FOUND).send({
                    code: STATUS_CODES.NOT_FOUND,
                    message: ENGLISH_MESSAGE.DELETE_FAIL,
                    status: "error"
                });
            }
        }

        await FestivalModel.findByIdAndDelete(req.params.id);
        logger.info('Deleted item', { dltitem });

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: TAMIL_MESSAGE.DELETE_SUCC,
                data: dltitem,
                status: "success"
            });
        } else {
            res.status(STATUS_CODES.SUCCESS).send({
                code: STATUS_CODES.SUCCESS,
                message: ENGLISH_MESSAGE.DELETE_SUCC,
                data: dltitem,
                status: "success"
            });
        }

    } catch (error) {
        logger.error('Error deleting item', { error: error.message });

        if (req.query.lang === "TA") {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: TAMIL_MESSAGE.DELETE_FAIL,
                status: "error"
            });
        } else {
            res.status(STATUS_CODES.SERVER_ERROR).send({
                code: STATUS_CODES.SERVER_ERROR,
                message: ENGLISH_MESSAGE.DELETE_FAIL,
                status: "error"
            });
        }
    }
};

module.exports = {
    createItem,
    getAllCmsItems,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};


