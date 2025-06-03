const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: { type: Number, required: true, min: 0 },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps: true });

// Compound index to make sure unique item name per user
ItemSchema.index({ userId: 1, name: 1 }, { unique: true });

const Item = mongoose.model("items", ItemSchema);
module.exports = Item;