const Item = require('../models/Item');
const logger = require('../utils/logger');
const mongoose = require('mongoose');

/*******Create Method*******/
const createItem = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        logger.info('Create item request received', { name, quantity });

        //validating inputs
        if(!name || quantity == null || !quantity){
            logger.warn('Create Item: Missing name or quantity');
            return res.status(400).json({message: "Name and quantity are required!", success: false});
        }

        const numericQuantity = Number(quantity);

        //handle negative quantity
        if(Number.isNaN(numericQuantity) || numericQuantity < 0){
            logger.warn('Negative Quantity: Please enter a valid quantity!');
            return res.status(400).json({message: "Please enter a valid (non-negative) quantity!", success: false});
        }

        // Check if item already exists for this user
        const existingItem = await Item.findOne({ name: name, userId: req?.user?.id });

        if (existingItem) {
            // Update existing item's quantity
            existingItem.quantity = Number(existingItem?.quantity) + Number(quantity);
            await existingItem.save();

            logger.info(`Item quantity updated: ${existingItem._id}`);
            return res.status(200).json({ data: existingItem, message: "Item quantity updated successfully!", success: true });
        }

        //add new item into db
        const newItem = new Item({name: name, quantity: numericQuantity, userId: req?.user?.id});
        await newItem.save();

        logger.info(`Item created successfully: ${newItem._id}`);
        res.status(200).json({ data: newItem, message: "Item created successfully!", success: true });

    } catch (error) {
        logger.error("Create Item Error", { error: error.message, stack: error.stack });
        throw new Error('Internal server error!');
    }
}

/********Get Items by userId********/
const getItemById = async (req, res) => {
    try {
        let userId = req?.user?.id;
        logger.info('Get item by userId request received', { userId });

        //validating inputs
        if(!userId){
            logger.error('Get items: User ID not found in request');
            return res.status(500).json({message: "User Id not found!", success: false})
        }

        //fetch items from db
        const items = await Item.find({userId: userId});
        logger.info(`Fetched ${items.length} items for user ${userId}`);

        res.status(200).json({ data: items, message: "Items fetched successfully!", success: true });

    } catch (error) {
        logger.error("Get Items Error", { error: error.message, stack: error.stack });
        throw new Error('Internal server error!');
    }
}

/**********Update Item************/
const updateItem = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const { id } = req.params;
        logger.info('Update item request received', { id, name, quantity });

        //validating inputs
        if(!id){
            logger.warn('Update Item: Missing item ID');
            return res.staus(400).json({ message: "Id not found!", success: false });
        }

        //validating mongo object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format', success: false });
        }

        const numericQuantity = Number(quantity);

        //handle negative quantity
        if(Number.isNaN(numericQuantity) || numericQuantity < 0){
            logger.warn('Negative Quantity: Please enter a valid quantity!');
            return res.status(400).json({message: "Please enter a valid (non-negative) quantity!", success: false});
        }

        //check if item exists
        let item = await Item.findOne({_id: id});

        if(!item){
            logger.warn(`Update Item: Item not found with id ${id}`);
            return res.status(400).json({ message: "Item not found!", success: false });
        }

        if(name){
            item.name = name;
        }

        if(quantity != null){
            item.quantity = numericQuantity;
        }

        //updating in DB
        await item.save();
        
        logger.info(`Item updated successfully: ${id}`);
        res.status(200).json({ data: item, message: "Item updated successfully!", success: true });

    } catch (error) {
        logger.error("Update Item Error", { error: error.message, stack: error.stack });
        throw new Error('Internal server error!');
    }
}

/***********Delete Item************/
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info('Delete item request received', { id });

        //validating inputs
        if(!id){
            logger.warn('Delete Item: Missing item ID');
            return res.status(400).json({message: "Id not found!", success: false})
        }

        //validating mongo object id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format', success: false });
        }

        //check in DB
        const item = await Item.findOneAndDelete({_id: id});

        if(!item){
            logger.warn(`Delete Item: Item not found with id ${id}`);
            return res.json({message: "Item not found!", success: false});
        }

        logger.info(`Item deleted successfully: ${id}`);
        res.status(200).json({message: "Item deleted succsessfully!", success: true});
        
    } catch (error) {
        logger.error("Delete Item Error", { error: error.message, stack: error.stack });
        throw new Error('Internal server error!');
    }
}

module.exports = { createItem, getItemById, updateItem, deleteItem };