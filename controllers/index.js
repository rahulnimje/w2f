'use strict';

var IndexModel = require('../models/index');
var surveryData = require('../models/surveyData');
var accountDAO = require ('../lib/accountDAO');


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

 /*   router.get('/createAccount', function (req, res) {
        //TODD: Save account information to database if action is create
        console.log("I am here");
        console.log(req.query.nextRoute);
        console.log((req));
        surveryData(req.query.nextRoute,function(err,survey){
            console.log(req.params);
            console.log(JSON.stringify(survey));
            res.render(survey.templateName, survey);
        });


    });*/

    router.post('/createAccount', function (req, res) {

        surveryData(req.query.nextRoute,function(err,survey){
            console.log(JSON.stringify(req.query));

            // req.body will have all the form values. 
            console.log(JSON.stringify(req.body));
            //console.log(req.body.firstName);
            var new_account = { first_name: req.body.firstName, last_name: req.body.lastName, password: req.body.password,
                'email': req.body.email, language: 'en_US'  };
            var new_account_number = accountDAO.createAccount(new_account,returnResult);
            console.log('new account number is: ', new_account_number);

            res.render('questionTemplate', survey);
        });



    });
    var returnResult = function(err,response){
      console.log(response);

    }

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

        surveryData(req.query.nextRoute,function(err,survey){

        if(survey.templateName==="surveyResources")
        {
            res.render('surveyResources', survey);
        }else {
            res.render('questionTemplate', survey);
        }

        });
    });


};
