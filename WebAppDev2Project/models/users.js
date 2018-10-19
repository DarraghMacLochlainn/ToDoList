let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username: String,
        objectives: [{
            todo_id: Number,
            time: String,
            location: String,
            likes: Number,
            goal: String
        }]
    },
    {collection: 'TODOdb'});

module.exports = mongoose.model('User', UserSchema);
