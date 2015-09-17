'use strict';

var SurveyControllerModel = require('../models/surveyController');


module.exports = function (router) {

    var model = new SurveyControllerModel();

    router.get('/survey', function (req, res) {
        
        
        res.render('surveyController', model);
        
        
    });

};
