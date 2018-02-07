var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var jwtCon = require('../config/jwtconfig')

var AuthenticationController = {};

AuthenticationController.login = (username, password, cb) => {
    User.findOne({ username: username }, (err, doc) => {
        if (err) {
            cb(err);
        }
        if (!doc || !bcrypt.compareSync(password, doc.password)) {
            var err = new Error('User or password invalid');
            err.status = 404;
            cb(err);
        } else {
            doc.set('password', undefined);
            doc.set('_id', undefined);
            doc.set('__v', undefined);
            cb(null, { success: true, data: doc, token: token(doc) });
        }
    });
}

AuthenticationController.decode = (token, cb) => {

    jwt.verify(token, jwtCon.secret, function (err, decoded) {
        if (err) {
            cb(err);
            return;
        } else {
            cb(null, decoded);
        }
    });

}

AuthenticationController.logout = (token) => {

}

token = (user) => {
    let payload = {
        username: user.username
    }
    return jwt.sign(payload, jwtCon.secret, {
        expiresIn: 1440
    });
}


module.exports = AuthenticationController;
