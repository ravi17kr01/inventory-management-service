const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps: true });

const Item = mongoose.model("items", ItemSchema);
module.exports = Item;