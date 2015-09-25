'use strict';

var IndexModel = require('../models/index');
var surveryData = require('../models/surveyData');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
       res.render('index');

   /*     surveryData('newAccount.json',function(err,survey){
                  console.log(JSON.stringify(survey));
                    res.render(survey.templateName, survey);
                });*/
             });
        
   //    surveryData('currentBusinessStatus.json',function(err,survey){
   //        console.log(JSON.stringify(survey));
   //        res.render(survey.templateName, survey);
   //    });
   // });

    router.get('/createAccount', function (req, res) {
        //TODD: Save account information to database if action is create
        console.log("I am here");
        console.log(req.query.nextRoute);
        console.log((req));
        surveryData(req.query.nextRoute,function(err,survey){
            console.log(req.params);
            console.log(JSON.stringify(survey));
            res.render(survey.templateName, survey);
        });


    });


     router.get('/toGetTheFirstQuestion', function (req, res) {
        
      /* surveryData('start.json',function(err,survey){
           console.log(JSON.stringify(survey));
           res.render('questionTemplate', survey);
       });*/

 surveryData('newAccount.json',function(err,survey){
                  console.log(JSON.stringify(survey));
                    res.render(survey.templateName, survey);
                });

        
        
    });


    router.get('/nextSurvey', function (req, res) {

        console.log((req));
        surveryData(req.query.nextRoute,function(err,survey){
            console.log(req.params);
            console.log(JSON.stringify(survey));

            res.render('questionTemplate', survey);

          //  res.render(survey.templateName, survey);

        });
    });


};
