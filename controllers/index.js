'use strict';

var IndexModel = require('../models/index');
var accountDAO = require('../lib/accountDAO');
var accountpropertiesDAO = require('../lib/accountpropertiesDAO');
var surveyData = require('../lib/surveyData');
var surveyForm = require('../lib/surveyForm');

module.exports = function (router) {

	var model = new IndexModel();

	router.get('/', function (req, res) {

		console.log("all tage json " + JSON.stringify(surveyData.getAllTags()));
		var allTags={};
		allTags['tags']=surveyData.getAllTags();
		res.render('index',allTags);
	});

	router.post('/createAccount', function (req, res) {

		// console.log("/createAccount is called");

		// req.body will have all the form values.
		// console.log(JSON.stringify(req.body));
		var language = req.body.language || 'en';

		var new_account = { first_name: req.body.firstName, last_name: req.body.lastName, password: req.body.password,
			'email': req.body.email, language: 'en'  };

		accountDAO.createAccount(new_account, function (return_code, new_account_number) {
			console.log('new account number is: ', new_account_number);
			// gather the metadata for the frontend
			var survey = surveyData.get(req.query.nextRoute);

			// also gather the language and account number for the frontend.
			survey['language'] = language;
			survey['account_number'] = new_account_number;
			survey['all_unique_tags'] = surveyData.getAllTags();
			// console.log(survey);

			res.render('questionTemplate', survey);
		});

	});

	var returnResult = function (err, response) {
		console.log(response);

	}

	router.get('/toGetTheFirstQuestion', function (req, res) {
		console.log("/toGetTheFirstQuestion is called");

		var language = req.body.language || 'en';
		var account_number = req.body.account_number;

		// TODO:  if account_number is null or 0, error log
		var survey = surveyForm.get('basicContactInfo');

		// also gather the language and account number for the frontend.
		survey['language'] = language;
		survey['account_number'] = account_number;
		survey['all_unique_tags'] = surveyData.getAllTags();
		console.log(survey);
		res.render(survey.templateName, survey);


	});


	router.get('/nextSurvey', function (req, res) {
		// console.log("/nextSurvey is called");
		// console.log('req.body is ', req.body);

		var language = req.body.language || 'en';
		var account_number = req.body.account_number;  // Tejas:  Please pass up the account_number

		// TODO:  if account_number is null or 0, error log

		// gather the metadata for the frontend
		var survey = surveyData.get(req.query.nextRoute);



		// also gather the language and account number for the frontend.
		survey['language'] = language;
		survey['account_number'] = account_number;
		survey['all_unique_tags'] = surveyData.getAllTags();

		console.log(JSON.stringify(survey));

		// console.log('req.query', req.query);
		var new_account_properties = {
			account_number: account_number,
			name: req.query.name || 'UNKNOWN',  // Tejas:  Please pass up the name (e.g. 
			value: req.query.value || 'UNKNOWN'  // Tejas:  Please pass up the value (e.g. yes, no)
		}

		accountpropertiesDAO.createAccountProperties(new_account_properties, function (return_code) {

			if (survey.templateName === "surveyResources") {
				res.render('surveyResources', survey);
			} else {
				res.render('questionTemplate', survey);
			}
		});

	});


};
