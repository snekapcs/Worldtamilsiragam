const MultilingualModel = require('../models/multilingual');
const logger = require('../logger');

// Create
const createItem = async (req, res) => {
  try {
    const newItem = new MultilingualModel(req.body);
    await newItem.save();
    logger.info('Item created', { item: newItem });
    res.status(201).send(newItem);
  } catch (error) {
    logger.error('Error creating item', { error: error.message });
    res.status(400).send(error);
  }
};

// Read all
const getAllItems = async (req, res) => {
  try {
    const items = await MultilingualModel.find();
    logger.info('Retrieved all items');
    res.status(200).send(items);
  } catch (error) {
    logger.error('Error retrieving items', { error: error.message });
    res.status(500).send(error);
  }
};

// Read by ID
const getItemById = async (req, res) => {
  try {
    const item = await MultilingualModel.findById(req.params.id);
    if (!item) {
      logger.warn('Item not found', { id: req.params.id });
      return res.status(404).send();
    }
    logger.info('Retrieved item by ID', { item });
    res.status(200).send(item);
  } catch (error) {
    logger.error('Error retrieving item', { error: error.message });
    res.status(500).send(error);
  }
};

// Update
const updateItem = async (req, res) => {
  try {
    const item = await MultilingualModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      logger.warn('Item not found for update', { id: req.params.id });
      return res.status(404).send();
    }
    logger.info('Updated item', { item });
    res.status(200).send(item);
  } catch (error) {
    logger.error('Error updating item', { error: error.message });
    res.status(400).send(error);
  }
};

// Delete
const deleteItem = async (req, res) => {
  try {
    const item = await MultilingualModel.findByIdAndDelete(req.params.id);
    if (!item) {
      logger.warn('Item not found for deletion', { id: req.params.id });
      return res.status(404).send();
    }
    logger.info('Deleted item', { item });
    res.status(200).send(item);
  } catch (error) {
    logger.error('Error deleting item', { error: error.message });
    res.status(500).send(error);
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem
};
