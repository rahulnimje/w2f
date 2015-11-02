'use strict';

var IndexModel = require('../models/index');
var surveryData = require('../models/surveyData');
var accountDAO = require('../lib/accountDAO');
var surveyData = require('../lib/surveyData');

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

			// console.log(JSON.stringify(req.query));

			// req.body will have all the form values.
			// console.log(JSON.stringify(req.body));
			var language = req.body.language || 'en';

			var new_account = { first_name: req.body.firstName, last_name: req.body.lastName, password: req.body.password,
				'email': req.body.email, language: 'en'  };
			var new_account_number = accountDAO.createAccount(new_account, returnResult);

			// console.log('new account number is: ', new_account_number);

			var survey = surveyData.get(req.query.nextRoute);
			survey['language'] = language;

			res.render('questionTemplate', survey);

	});

	var returnResult = function (err, response) {
		console.log(response);

	}

	router.get('/toGetTheFirstQuestion', function (req, res) {
		var language = req.body.language || 'en';

		surveryData('newAccount.json', function (err, survey) {
			survey['language'] = language;
			res.render(survey.templateName, survey);
		});


	});


	router.get('/nextSurvey', function (req, res) {

		var language = req.body.language || 'en';

		//console.log('nextroute is ' + req.query.nextRoute);
		var survey = surveyData.get(req.query.nextRoute);
		survey['language'] = language;
		// console.log('survey is ' + survey);

		if (survey.templateName === "surveyResources") {
			res.render('surveyResources', survey);
		} else {
			res.render('questionTemplate', survey);
		}

	});


};
