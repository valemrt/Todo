'use strict';

module.exports.isEmptyObject = function (objectInput) {

    for (let name in objectInput) {
        return false;
    }
    return true;
};
module.exports.getAccountFromToken = function (authToken) {
    return 'account'; //fake for now
};

module.exports.generateID = function () {
    // TODO: id field not mandatory
    // generate ID based on task properties?
};