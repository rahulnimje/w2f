'use strict';

var IndexModel = require('../models/index');
var accountDAO = require('../lib/accountDAO');
var accountpropertiesDAO = require('../lib/accountpropertiesDAO');
var surveyData = require('../lib/surveyData');

module.exports = function (router) {

	var model = new IndexModel();
	// Root
	router.get('/', function (req, res) {
		res.redirect(req.app.kraken.get('requestURI'));
	});


	router.get('/survey', function (req, res) {

		// console.log("all tage json " + JSON.stringify(surveyData.getAllTags()));

		var language = req.query.language || 'en';

		var allTags={};

		allTags['tags']=surveyData.getAllTags();
		allTags['language'] = language;

		res.locals.locale =  { language: language, country: 'US' };
		res.render('index',allTags);
	});

	router.post('/createAccount', function (req, res) {

		// console.log("/createAccount is called");

		var language = req.body.preferred_language || 'en',
			firstName = req.body.firstName,
			lastName = req.body.lastName,
			email = req.body.lastName;

		var skip_create_account = req.query.skip_create_account;
		if (skip_create_account === 'true') {
			firstName = 'GUEST';
			lastName = 'GUEST';
			email = 'UNKNOWN';
		}


		//console.log("req.body: ", req.body);

		var new_account = { first_name: firstName, last_name: lastName,
			email: email, language: language  };

		res.locals.locale =  { language: language, country: 'US' };


		accountDAO.createAccount(new_account, function (return_code, new_account_number) {
			console.log('new account number is: ', new_account_number);
			// gather the metadata for the frontend
			var survey = surveyData.get(req.query.nextRoute);

			// also gather the language and account number for the frontend.
			survey['language'] = language;
			survey['account_number'] = new_account_number;
			survey['all_unique_tags'] = surveyData.getAllTags();

			res.render('questionTemplate', survey);

		});

	});



	var returnResult = function (err, response) {
		console.log(response);

	}

	router.get('/toGetTheFirstQuestion', function (req, res) {
		//console.log("/toGetTheFirstQuestion is called");

		//console.log("query is ", req.query);


		// if there is language preferred, use that language
		var language = req.query.language || 'en';

		// TODO:  if account_number is null or 0, error log
		var survey = {};
		var templateName = "surveyForm";

		// also gather the language and account number for the frontend.
		survey['language'] = language;
		survey['all_unique_tags'] = surveyData.getAllTags();

		res.locals.locale =  { language: language, country: 'US' };

		res.render(templateName, survey);


	});


	router.get('/nextSurvey', function (req, res) {

		console.log(JSON.stringify(req.query));
		var language = req.query.language || 'en';
		var account_number = req.query.account_number;  // Tejas:  Please pass up the account_number
		var analytic_name = req.query.analytic_name || 'UNKNOWN';
		var analytic_value = req.query.analytic_value || 'UNKNOWN';


		// Set the language
		res.locals.locale =  { language: language, country: 'US' };

		// gather the metadata for the frontend
		var survey = surveyData.get(req.query.nextRoute);

		// also gather the language and account number for the frontend.
		survey['language'] = language;
		survey['account_number'] = account_number;
		survey['all_unique_tags'] = surveyData.getAllTags();

		// console.log('req.query', req.query);
		var new_account_properties = {
			account_number: account_number,
			name: analytic_name,
			value: analytic_value
		}

		// console.log(res);

		accountpropertiesDAO.createAccountProperties(new_account_properties, function (return_code) {

			if (survey.templateName === "surveyResources") {
				res.render('surveyResources', survey);
			} else {
				res.render('questionTemplate', survey);
			}
		});

	});


};
