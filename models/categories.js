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
    categoryName: {
        type: String,
        required: true,
    },
});

const Categorie = mongoose.model('categorie', categorieSchema);

module.exports = Categorie;