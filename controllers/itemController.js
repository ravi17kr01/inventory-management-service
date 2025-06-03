const Item = require('../models/Item');
const logger = require('../utils/logger');

/*******Create Method*******/
const createItem = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        logger.info('Create item request received', { name, quantity });

        //validating inputs
        if(!name || quantity == null){
            logger.warn('Create Item: Missing name or quantity');
            return res.status(400).json({message: "Name and quantity are required!"});
        }

        //add new item into db
        const newItem = new Item({name: name, quantity: quantity, user: req.user.id});
        await newItem.save();

        logger.info(`Item created successfully: ${newItem._id}`);
        res.status(200).json(newItem);

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
            return res.status(500).json({message: "User Id not found!"})
        }

        //fetch items from db
        const items = await Item.find({user: userId});
        logger.info(`Fetched ${items.length} items for user ${userId}`);

        res.status(200).json(items);

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
            return res.staus(400).json({message: "Id not found!"});
        }

        //check if item exists
        let item = await Item.findOne({_id: id});

        if(!item){
            logger.warn(`Update Item: Item not found with id ${id}`);
            return res.status(400).json({message: "Item not found!"});
        }

        if(name){
            item.name = name;
        }

        if(quantity != null){
            item.quantity = quantity;
        }

        //updating in DB
        await item.save();
        
        logger.info(`Item updated successfully: ${id}`);
        res.status(200).json(item);

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
            return res.status(400).json({message: "Id not found!"})
        }

        //check in DB
        const item = await Item.findOneAndDelete({_id: id});

        if(!item){
            logger.warn(`Delete Item: Item not found with id ${id}`);
            return res.json({message: "Item not found!"});
        }

        logger.info(`Item deleted successfully: ${id}`);
        res.status(200).json({message: "Item deleted succsessfully!"});
        
    } catch (error) {
        logger.error("Delete Item Error", { error: error.message, stack: error.stack });
        throw new Error('Internal server error!');
    }
}

module.exports = { createItem, getItemById, updateItem, deleteItem };