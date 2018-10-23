let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username: String,
        objectives: [{
        }]
    },
    {collection: 'tododb'});

module.exports = mongoose.model('User', UserSchema);
