'use strict';
var fs = require('fs');

module.exports = function surveyData(fileName, callback) {
    var templateJson = JSON.parse(fs.readFileSync('data/' + fileName, 'utf8'));

    //console.log(JSON.stringify(templateJson));

    callback(null, templateJson);

};
