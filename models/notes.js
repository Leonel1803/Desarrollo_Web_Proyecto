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
    date: {
        type: Date,
        default: Date.now
    },
    noteName: {
        type: String,
        required: true,
    },
    noteContent: {
        type: String,
        required: false,
    },
    portraitNoteImage: {
        type: String,
        required: false,
    }
});

const Note = mongoose.model('note', noteSchema);

module.exports = Note;