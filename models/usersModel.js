var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Users', userSchema);