const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    uuidCategory: {
        type: String,
        required: true,
    },
    uuidUserPropietary: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    categoryName: {
        type: String,
        required: true,
    },
});

const Categorie = mongoose.model('categorie', categorieSchema);

module.exports = Categorie;