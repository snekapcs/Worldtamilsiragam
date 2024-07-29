const MultilingualModel = require('../models/multiligualSchema.js');
const logger = require('../logger');
const { TAMIL_MESSAGE, ENGLISH_MESSAGE, STATUS_CODES } = require("../util/constant.js");

// Create a new item
const createItem = async (req, res) => {
  try {
    const newItem = new MultilingualModel(req.body);
    await newItem.save();
    logger.info('Item created', { item: newItem });

    if (req?.body?.lang === "TA") {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: TAMIL_MESSAGE.CREATE_SUCC,
        data: newItem,
        status: "success"
      });
    } else {
      res.status(STATUS_CODES.SUCCESS).send({
        code: STATUS_CODES.SUCCESS,
        message: ENGLISH_MESSAGE.CREATE_SUCC,
        data: newItem,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error creating item', { error: error.message });

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
};

// Retrieve all items
const getAllItems = async (req, res) => {
  try {
    let selectedValue = 'name_en description_en _id';
    if (req.query.lang && req.query.lang === "TA") {
      selectedValue = 'name_ta description_ta _id';
    }
    const items = await MultilingualModel.find({}, selectedValue);
    logger.info('Retrieved all items');

    if (req?.query?.lang === "TA") {
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

// Retrieve an item by ID
const getItemById = async (req, res) => {
  try {
    let selectedValue = 'name_en description_en _id';
    if (req.query.lang && req.query.lang === "TA") {
      selectedValue = 'name_ta description_ta _id';
    }

    const item = await MultilingualModel.findById(req.params.id, selectedValue);
    if (!item) {
      logger.warn('Item not found', { id: req.params.id });

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
    } else {
      logger.info('Retrieved item by ID', { item });

      if (req?.query?.lang === "TA") {
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
    }
  } catch (error) {
    logger.error('Error retrieving item', { error: error.message });

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

// Update an existing item
const updateItem = async (req, res) => {
  try {
    const item = await MultilingualModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      logger.warn('Item not found for update', { id: req.params.id });

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
    } else {
      let selectedValue = 'name_en description_en _id';
      if (req.query.lang && req.query.lang === "TA") {
        selectedValue = 'name_ta description_ta _id';
      }
      const updatedItem = await MultilingualModel.findById(req.params.id, selectedValue);

      logger.info('Updated item', { item: updatedItem });

      if (req?.query?.lang === "TA") {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: TAMIL_MESSAGE.UPDATE_SUCC,
          data: updatedItem,
          status: "success"
        });
      } else {
        res.status(STATUS_CODES.SUCCESS).send({
          code: STATUS_CODES.SUCCESS,
          message: ENGLISH_MESSAGE.UPDATE_SUCC,
          data: updatedItem,
          status: "success"
        });
      }
    }
  } catch (error) {
    logger.error('Error updating item', { error: error.message });

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
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    let selectedFields = 'name_en description_en _id';
    if (req.query.lang && req.query.lang === "TA") {
      selectedFields = 'name_ta description_ta _id';
    }

    const dltitem = await MultilingualModel.findById(req.params.id).select(selectedFields);
    if (!dltitem) {
      logger.warn('Item not found for deletion', { id: req.params.id });

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
    } else {
      await MultilingualModel.findByIdAndDelete(req.params.id);
      logger.info('Deleted item', { dltitem });

      if (req?.query?.lang === "TA") {
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
    }
  } catch (error) {
    logger.error('Error deleting item', { error: error.message });

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
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
