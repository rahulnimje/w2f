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


var accountpropertiesDAO = {
	createAccountProperties: function (account, callback) {
		var connection = mysql.createConnection(dbconfig);

		var new_account_properties = {
			'account_number': account.account_number || 172, // temporarily hardcode for now until Tejas pass back the account number
			'name': account.name,
			'value': account.value
		};

		this.getByAccountNumberName(new_account_properties, function (err, rows) {

			connection.connect();
			if (err === null) {
				if (rows.length === 0) {
					console.log("INSERT");
					connection.query('INSERT INTO accountproperties SET ?', new_account_properties, function (err, res) {
						if (err) throw err;

						callback(err);

					});

				} else {
					console.log("UPDATE");
					connection.query('UPDATE accountproperties SET ?', new_account_properties, function (err, res) {
						if (err) throw err;

						callback(err);

					});
				}
			} else {
				callback(err);
			}
			connection.end();
		});


	},
	getByAccountNumberName: function (account_properties, callback) {

		var connection = mysql.createConnection(dbconfig);

		connection.connect();

		connection.query('SELECT * from accountproperties where account_number = ? and name = ?',
			[account_properties.account_number, account_properties.name], function (err, rows, fields) {
				console.log('err', err);
				console.log('rows', rows);

				if (err) throw err;

				callback(err, rows);
			});

		connection.end();
	}
};

module.exports = accountpropertiesDAO;
