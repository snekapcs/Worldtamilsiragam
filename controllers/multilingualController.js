const MultilingualModel = require('../models/multiligualSchema.js');
const logger = require('../logger');
const { TAMIL_MESSAGE, ENGLISH_MESSAGE } = require("../util/constant.js");

// Create a new item
const createItem = async (req, res) => {
  try {
    const newItem = new MultilingualModel(req.body);
    await newItem.save();
    logger.info('Item created', { item: newItem });

    if (req?.body?.lang === "TA") {
      res.status(200).send({
        code: 200,
        message: TAMIL_MESSAGE.CREATE_SUCC,
        data: newItem,
        status: "success"
      });
    } else {
      res.status(200).send({
        code: 200,
        message: ENGLISH_MESSAGE.CREATE_SUCC,
        data: newItem,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error creating item', { error: error.message });

    if (req?.body?.lang === "TA") {
      res.status(500).send({
        code: 500,
        message: TAMIL_MESSAGE.CREATE_FAIL,
        status: "error"
      });
    } else {
      res.status(500).send({
        code: 500,
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
      res.status(200).send({
        code: 200,
        message: TAMIL_MESSAGE.GET_SUCC,
        data: items,
        status: "success"
      });
    } else {
      res.status(200).send({
        code: 200,
        message: ENGLISH_MESSAGE.GET_SUCC,
        data: items,
        status: "success"
      });
    }

  } catch (error) {
    logger.error('Error retrieving items', { error: error.message });

    if (req?.query?.lang === "TA") {
      res.status(500).send({
        code: 500,
        message: TAMIL_MESSAGE.GET_FAIL,
        status: "error"
      });
    } else {
      res.status(500).send({
        code: 500,
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
        res.status(404).send({
          code: 404,
          message: TAMIL_MESSAGE.GET_BY_ID_FAIL,
          status: "error"
        });
      } else {
        res.status(404).send({
          code: 404,
          message: ENGLISH_MESSAGE.GET_BY_ID_FAIL,
          status: "error"
        });
      }
    }

    logger.info('Retrieved item by ID', { item });

    if (req?.query?.lang === "TA") {
      res.status(200).send({
        code: 200,
        message: TAMIL_MESSAGE.GET_BY_ID_SUCC,
        data: item,
        status: "success"
      });
    } else {
      res.status(200).send({
        code: 200,
        message: ENGLISH_MESSAGE.GET_BY_ID_SUCC,
        data: item,
        status: "success"
      });
    }

  } catch (error) {
    logger.error('Error retrieving item', { error: error.message });

    if (req?.query?.lang === "TA") {
      res.status(500).send({
        code: 500,
        message: TAMIL_MESSAGE.GET_BY_ID_FAIL,
        status: "error"
      });
    } else {
      res.status(500).send({
        code: 500,
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
        res.status(404).send({
          code: 404,
          message: TAMIL_MESSAGE.UPDATE_FAIL,
          status: "error"
        });

      } else {
        res.status(404).send({
          code: 404,
          message: ENGLISH_MESSAGE.UPDATE_FAIL,
          status: "error"
        });
      }
    }

    let selectedValue = 'name_en description_en _id';
    if (req.query.lang && req.query.lang === "TA") {
      selectedValue = 'name_ta description_ta _id';
    }
    const updatedItem = await MultilingualModel.findById(req.params.id, selectedValue);

    logger.info('Updated item', { item: updatedItem });

    if (req?.query?.lang === "TA") {
      res.status(200).send({
        code: 200,
        message: TAMIL_MESSAGE.UPDATE_SUCC,
        data: updatedItem,
        status: "success"
      });

    } else {
      res.status(200).send({
        code: 200,
        message: ENGLISH_MESSAGE.UPDATE_SUCC,
        data: updatedItem,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error updating item', { error: error.message });

    if (req?.query?.lang === "TA") {
      res.status(500).send({
        code: 500,
        message: TAMIL_MESSAGE.UPDATE_FAIL,
        status: "error"
      });

    } else {
      res.status(500).send({
        code: 500,
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
        res.status(404).send({
          code: 404,
          message: TAMIL_MESSAGE.DELETE_FAIL,
          status: "error"
        });
  
      } else {
        res.status(404).send({
          code: 404,
          message: ENGLISH_MESSAGE.DELETE_FAIL,
          status: "error"
        });
      }
    }

    await MultilingualModel.findByIdAndDelete(req.params.id);
    logger.info('Deleted item', { dltitem });

    if (req?.query?.lang === "TA") {
      res.status(200).send({
        code: 200,
        message: TAMIL_MESSAGE.DELETE_SUCC,
        data: dltitem,
        status: "success"
      });

    } else {
      res.status(200).send({
        code: 200,
        message: ENGLISH_MESSAGE.DELETE_SUCC,
        data: dltitem,
        status: "success"
      });
    }
  } catch (error) {
    logger.error('Error deleting item', { error: error.message });

    if (req?.query?.lang === "TA") {
      res.status(500).send({
        code: 500,
        message: TAMIL_MESSAGE.DELETE_FAIL,
        status: "error"
      });

    } else {
      res.status(500).send({
        code: 500,
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





// const MultilingualModel = require('../models/multiligual.js');
// const logger = require('../logger');
// const { TAMIL_MESSAGE, ENGLISH_MESSAGE } = require("../util/constant.js");

// // // Log the imported constants for debugging
// // logger.info('TAMIL_MESSAGE:', TAMIL_MESSAGE);
// // logger.info('ENGLISH_MESSAGE:', ENGLISH_MESSAGE);

// // Create a new item
// const createItem = async (req, res) => {
//   try {
//     const newItem = new MultilingualModel(req.body);
//     await newItem.save();
//     logger.info('Item created', { item: newItem });

//     if (req?.body?.lang === "TA") {
//       res.status(200).send({
//         code: 200,
//         message: TAMIL_MESSAGE.CREATE_SUCC,
//         status: "success"
//       });
//     } else {
//       res.status(200).send({
//         code: 200,
//         message: ENGLISH_MESSAGE.CREATE_SUCC,
//         status: "success"
//       });
//     }

//   } catch (error) {
//     logger.error('Error creating item', { error: error.message });

//     if (req?.body?.lang === "TA") {
//       res.status(400).send({
//         code: 400,
//         message: TAMIL_MESSAGE.CREATE_FAIL,
//         status: "error"
//       });
//     } else {
//       res.status(400).send({
//         code: 400,
//         message: ENGLISH_MESSAGE.CREATE_FAIL,
//         status: "error"
//       });
//     }
//   }
// };

// // Retrieve all items
// const getAllItems = async (req, res) => {
//   try {
//     let selectedValue = 'name_en description_en _id'
//     if(req.param.lang){
//      selectedValue = 'name_en description_en _id'
//     }
//     const items = await MultilingualModel.find({},selectedValue);
//     logger.info('Retrieved all items');
//     res.status(200).send(items);
//   } catch (error) {
//     logger.error('Error retrieving items', { error: error.message });
//     res.status(500).send(error);
//   }
// };


// // Retrieve an item by ID
// const getItemById = async (req, res) => {
//   try {
//     let selectedValue = 'name_en description_en _id';
//     if (req.query.lang && req.query.lang === "TA") {
//       selectedValue = 'name_ta description_ta _id';
//     }

//     const item = await MultilingualModel.findById(req.params.id, selectedValue);
//     if (!item) {
//       logger.warn('Item not found', { id: req.params.id });
//       return res.status(404).send({
//         code: 404,
//         message: 'Item not found',
//         status: "error"
//       });
//     }

//     logger.info('Retrieved item by ID', { item });
//     res.status(200).send(item);
//   } catch (error) {
//     logger.error('Error retrieving item', { error: error.message });
//     res.status(500).send({
//       code: 500,
//       message: 'Error retrieving item',
//       status: "error"
//     });
//   }
// };


// // Update an existing item
// const updateItem = async (req, res) => {
//   try {
//     const item = await MultilingualModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!item) {
//       logger.warn('Item not found for update', { id: req.params.id });
//       return res.status(404).send({
//         code: 404,
//         message: 'Item not found',
//         status: "error"
//       });
//     }

//     let selectedValue = 'name_en description_en _id';
//     if (req.query.lang && req.query.lang === "TA") {
//       selectedValue = 'name_ta description_ta _id';
//     }
//     const updatedItem = await MultilingualModel.findById(req.params.id, selectedValue);

//     logger.info('Updated item', { item: updatedItem });
//     res.status(200).send(updatedItem);
//   } catch (error) {
//     logger.error('Error updating item', { error: error.message });
//     res.status(400).send({
//       code: 400,
//       message: 'Error updating item',
//       status: "error"
//     });
//   }
// };

// // Delete an item
// const deleteItem = async (req, res) => {
//   try {
//     let selectedFields = 'name_en description_en _id';
//     if (req.query.lang && req.query.lang === "TA") {
//       selectedFields = 'name_ta description_ta _id';
//     }

//     const item = await MultilingualModel.findById(req.params.id).select(selectedFields);
//     if (!item) {
//       logger.warn('Item not found for deletion', { id: req.params.id });
//       return res.status(404).send({
//         code: 404,
//         message: 'Item not found',
//         status: "error"
//       });
//     }

//     await MultilingualModel.findByIdAndDelete(req.params.id);
//     logger.info('Deleted item', { item });
//     res.status(200).send(item);
//   } catch (error) {
//     logger.error('Error deleting item', { error: error.message });
//     res.status(500).send({
//       code: 500,
//       message: 'Error deleting item',
//       status: "error"
//     });
//   }
// };


// module.exports = {
//   createItem,
//   getAllItems,
//   getItemById,
//   updateItem,
//   deleteItem
// };













