const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    uuidNote: {
        type: String,
        required: true,
    },
    uuidCategoryPropietary: {
        type: String,
        required: true,
    },
    noteName: {
        type: String,
        required: true,
    },
    noteContent: {
        type: String,
        required: true,
    },
    portraitNoteImage: {
        type: String,
        required: false,
    }
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;