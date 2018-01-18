var mongoose = require('mongoose');

var Schema = {
    statusCode:{
        type:Number
    },
    message: {
        type:String,
        required: true
    }
}

module.exports = mongoose.model('Error', Schema);

