let mongoose = require('mongoose');

let ObjectiveSchema = new mongoose.Schema({
        todo_id: {type: Number, default: 0},
        time: String,
        location: String,
        goal: String,
        likes: {type: Number, default: 0}
    },
    {collection: 'tododb'});

module.exports = mongoose.model('Objective', ObjectiveSchema);
