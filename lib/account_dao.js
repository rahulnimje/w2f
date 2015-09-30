'use strict';
var mysql      = require('mysql');
var dbconfig = require('../config/config.json').dbconfig;

// This is how to call:  make sure email is unique
//
// var account_dao = require('./lib/account_dao')
// var new_account = { first_name: 'Mary', last_name: 'Smith', password: 'password123', 'email': 'marysmith@paypal.com', language: 'en_US'  };
// var new_account_number = account_dao.createAccount(new_account);
// console.log('new account number is: ', new_account_number);

// var account = account_dao.getByEmail('marysmith@paypal.com');
// console.log('new account is: ', account);



var account_dao = {
	createAccount: function(account) {
		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('INSERT INTO ACCOUNT SET ?', account, function(err, res){
			if(err) throw err;

			console.log('Last insert ID:', res.insertId);
			// console.log('res is ', res);

			return res.insertId;

		});

		connection.end();

	},
	getByAccountNumber: function(account_number) {

		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('SELECT * from ACCOUNT where account_number = ?', account_number, function(err, rows, fields) {
			if(err) throw err;

			return rows[0];
		});

		connection.end();
	},
	getByEmail: function(email) {

		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('SELECT * from ACCOUNT where email = ?', email, function(err, rows, fields) {
			if(err) throw err;

			console.log('getByEmail', rows[0])

			return rows[0];
		});

		connection.end();
	}
};

module.exports = account_dao;
