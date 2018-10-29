let mongoose = require('mongoose');

let ObjectiveSchema = new mongoose.Schema({
        goal:           String,
        user_id:        String,
        time:           String,
        location:       String,
        likes:          {type: Number, default: 0}
    },
    {collection: 'objectives'});

module.exports = mongoose.model('Objective', ObjectiveSchema);
