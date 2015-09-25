'use strict';

var IndexModel = require('../models/index');
var surveryData = require('../models/surveyData');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        
       surveryData('start.json',function(err,survey){
           console.log(JSON.stringify(survey));
           res.render('index', survey);
       });


        
        
    });

     router.get('/toGetTheFirstQuestion', function (req, res) {
        
       surveryData('start.json',function(err,survey){
           console.log(JSON.stringify(survey));
           res.render('questionTemplate', survey);
       });


        
        
    });

    router.get('/nextSurvey', function (req, res) {

        console.log((req));
        surveryData(req.query.nextRoute,function(err,survey){
            console.log(req.params);
            console.log(JSON.stringify(survey));
            res.render('questionTemplate', survey);
        });




    });

};
