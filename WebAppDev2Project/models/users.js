let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
        username:       String,
        password:       String,
        email:          String
    },
    {collection: 'users'});

module.exports = mongoose.model('User', UserSchema);
