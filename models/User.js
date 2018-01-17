var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

mongoose.plugin(require('mongoose-bcrypt'));

var Schema = {
    username: {
        type:String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        bcrypt:true,
        rounds:9,
        required:true
    }
}

module.exports = mongoose.model('User', Schema);

