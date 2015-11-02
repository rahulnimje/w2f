'use strict';
var mysql = require('mysql');
var dbconfig = require('../config/config.json').dbconfig;

// This is how to call:  make sure email is unique
//
// var accountDAO = require('./lib/accountDAO')
// var new_account = { first_name: 'Mary', last_name: 'Smith', 'email': 'marysmith@paypal.com', language: 'en_US'  };
// var new_account_number = accountDAO.createAccount(new_account);
// console.log('new account number is: ', new_account_number);

// var account = accountDAO.getByEmail('marysmith@paypal.com');
// console.log('new account is: ', account);


var accountDAO = {
	createAccount: function (account, callback) {
		var connection = mysql.createConnection(dbconfig);

		var new_account = {
			'first_name': account.first_name,
			'last_name' : account.last_name,
			'email': account.email,
			'language': account.language
		}

		connection.connect();

		connection.query('INSERT INTO account SET ?', new_account, function (err, res) {
			if (err) throw err;

			// console.log('New account id is ', res.insertId);
			// console.log('res is ', res);

			callback(err, res.insertId);

		});

		connection.end();

	},
	getByAccountNumber: function (account_number, callback) {

		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('SELECT * from account where account_number = ?', account_number, function (err, rows, fields) {
			if (err) throw err;

			callback(err, rows[0]);
		});

		connection.end();
	},
	getByEmail: function (email, callback) {

		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('SELECT * from account where email = ?', email, function (err, rows, fields) {
			if (err) throw err;

			//console.log('getByEmail', rows[0])

			callback(err, rows[0]);
		});

		connection.end();
	}
};

module.exports = accountDAO;
