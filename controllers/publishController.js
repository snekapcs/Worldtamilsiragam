const PublishModel = require('../models/publishSchema.js'); // Adjust the path to your Publish model
const logger = require('../logger');
const { TAMIL_MESSAGE, ENGLISH_MESSAGE, STATUS_CODES, FILE_UPLOAD } = require("../util/constant.js");
const upload = require('../middleware/upload');

// Create a new publish entry
const createPublish = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error('Error uploading file or image', { error: err.message });
      return res.status(STATUS_CODES.SERVER_ERROR).send({
        code: STATUS_CODES.SERVER_ERROR,
        message: FILE_UPLOAD.UPLOAD_ERROR,
        status: "error"
      });
    }

    try {
      const newPublish = new PublishModel({
        ...req.body,
        file: req.files?.file ? req.files.file[0].filename : undefined,
        image: req.files?.image ? req.files.image[0].filename : undefined // Add image field here
      });
      await newPublish.save();
      logger.info('Publish entry created', { publish: newPublish });

      if (req?.body?.lang === "TA") {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: TAMIL_MESSAGE.CREATE_SUCC,
          data: newPublish,
          status: "success"
        });
      } else {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: ENGLISH_MESSAGE.CREATE_SUCC,
          data: newPublish,
          status: "success"
        });
      }
    } catch (error) {
      logger.error('Error creating publish entry', { error: error.message });

      if (req?.body?.lang === "TA") {
        res.status(STATUS_CODES.SERVER_ERROR).send({
          code: STATUS_CODES.SERVER_ERROR,
          message: TAMIL_MESSAGE.CREATE_FAIL,
          status: "error"
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({
          code: STATUS_CODES.SERVER_ERROR,
          message: ENGLISH_MESSAGE.CREATE_FAIL,
          status: "error"
        });
      }
    }
  });
};

// Retrieve all CMS publish entries
const getAllCmsPublishes = async (req, res) => {
  try {
    let selectedFields = 'title_en title_ta image file isDisabled _id'; // Include image field
    const publishes = await PublishModel.find({}, selectedFields);
    logger.info('Retrieved all publish entries');

    res.status(STATUS_CODES.SUCCESS).send({
      code: STATUS_CODES.SUCCESS,
      message: ENGLISH_MESSAGE.GET_SUCC,
      data: publishes,
      status: "success"
    });
  } catch (error) {
    logger.error('Error retrieving publish entries', { error: error.message });

    res.status(STATUS_CODES.SERVER_ERROR).send({
      code: STATUS_CODES.SERVER_ERROR,
      message: ENGLISH_MESSAGE.GET_FAIL,
      status: "error"
    });
  }
};

// Retrieve all publish entries
const getAllPublishes = async (req, res) => {
  try {
    let selectedFields = 'title_en image file isDisabled _id'; // Include image field
    if (req.query.lang && req.query.lang === "TA") {
      selectedFields = 'title_ta image file isDisabled _id'; // Include image field for Tamil
    }
    const publishes = await PublishModel.find({}, selectedFields);
    logger.info('Retrieved all publish entries');

    if (req?.query?.lang === "TA") {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: TAMIL_MESSAGE.GET_SUCC,
        data: publishes,
        status: "success"
      });
    } else {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: ENGLISH_MESSAGE.GET_SUCC,
        data: publishes,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error retrieving publish entries', { error: error.message });

    if (req?.query?.lang === "TA") {
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

// Retrieve a single publish entry by ID
const getPublishById = async (req, res) => {
  try {
    let selectedFields = 'title_en image file isDisabled _id'; // Include image field
    if (req.query.lang && req.query.lang === "TA") {
      selectedFields = 'title_ta image file isDisabled _id'; // Include image field for Tamil
    }
    const publish = await PublishModel.findById(req.params.id, selectedFields);

    if (!publish) {
      logger.warn('Publish entry not found', { id: req.params.id });

      if (req?.query?.lang === "TA") {
        res.status(STATUS_CODES.NOT_FOUND).send({
          code: STATUS_CODES.NOT_FOUND,
          message: TAMIL_MESSAGE.GET_BY_ID_FAIL,
          status: "error"
        });
      } else {
        res.status(STATUS_CODES.NOT_FOUND).send({
          code: STATUS_CODES.NOT_FOUND,
          message: ENGLISH_MESSAGE.GET_BY_ID_FAIL,
          status: "error"
        });
      }
      return;
    }

    logger.info('Retrieved publish entry by ID', { publish });

    if (req?.query?.lang === "TA") {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: TAMIL_MESSAGE.GET_BY_ID_SUCC,
        data: publish,
        status: "success"
      });
    } else {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: ENGLISH_MESSAGE.GET_BY_ID_SUCC,
        data: publish,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error retrieving publish entry', { error: error.message });

    if (req?.query?.lang === "TA") {
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

// Update an existing publish entry
const updatePublish = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      logger.error('Error uploading file or image', { error: err.message });
      return res.status(STATUS_CODES.SERVER_ERROR).send({
        code: STATUS_CODES.SERVER_ERROR,
        message: FILE_UPLOAD.UPLOAD_ERROR,
        status: "error"
      });
    }

    try {
      const updateData = { ...req.body };
      if (req.files?.file) {
        updateData.file = req.files.file[0].filename;
      }
      if (req.files?.image) {
        updateData.image = req.files.image[0].filename; // Add image field for update
      }

      const publish = await PublishModel.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true
      });

      if (!publish) {
        logger.warn('Publish entry not found for update', { id: req.params.id });
        if (req?.query?.lang === "TA") {
          res.status(STATUS_CODES.NOT_FOUND).send({
            code: STATUS_CODES.NOT_FOUND,
            message: TAMIL_MESSAGE.UPDATE_FAIL,
            status: "error"
          });
        } else {
          res.status(STATUS_CODES.NOT_FOUND).send({
            code: STATUS_CODES.NOT_FOUND,
            message: ENGLISH_MESSAGE.UPDATE_FAIL,
            status: "error"
          });
        }
        return;
      }

      const updatedPublish = await PublishModel.findById(req.params.id);
      logger.info('Updated publish entry', { publish: updatedPublish });

      if (req?.query?.lang === "TA") {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: TAMIL_MESSAGE.UPDATE_SUCC,
          data: updatedPublish,
          status: "success"
        });
      } else {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: ENGLISH_MESSAGE.UPDATE_SUCC,
          data: updatedPublish,
          status: "success"
        });
      }
    } catch (error) {
      logger.error('Error updating publish entry', { error: error.message });

      if (req?.query?.lang === "TA") {
        res.status(STATUS_CODES.SERVER_ERROR).send({
          code: STATUS_CODES.SERVER_ERROR,
          message: TAMIL_MESSAGE.UPDATE_FAIL,
          status: "error"
        });
      } else {
        res.status(STATUS_CODES.SERVER_ERROR).send({
          code: STATUS_CODES.SERVER_ERROR,
          message: ENGLISH_MESSAGE.UPDATE_FAIL,
          status: "error"
        });
      }
    }
  });
};

// Delete a publish entry
const deletePublish = async (req, res) => {
  try {
    let selectedFields = 'title_en image file isDisabled _id'; // Include image field
    if (req.query.lang && req.query.lang === "TA") {
      selectedFields = 'title_ta image file isDisabled _id'; // Include image field for Tamil
    }
    const dltpublish = await PublishModel.findById(req.params.id).select(selectedFields);
    if (!dltpublish) {
      logger.warn('Publish entry not found for deletion', { id: req.params.id });
      if (req?.query?.lang === "TA") {
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
      return;
    }

    await PublishModel.findByIdAndDelete(req.params.id);
    logger.info('Deleted publish entry', { dltpublish });

    if (req?.query?.lang === "TA") {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: TAMIL_MESSAGE.DELETE_SUCC,
        data: dltpublish,
        status: "success"
      });
    } else {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: ENGLISH_MESSAGE.DELETE_SUCC,
        data: dltpublish,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error deleting publish entry', { error: error.message });

    if (req?.query?.lang === "TA") {
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
  createPublish,
  getAllCmsPublishes,
  getAllPublishes,
  getPublishById,
  updatePublish,
  deletePublish
};

  
