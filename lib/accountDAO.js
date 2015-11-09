'use strict';
var dbinstance = require('../lib/dbinstance');


var accountDAO = {
	createAccount: function (account, callback) {
		var new_account = {
			'first_name': account.first_name,
			'last_name': account.last_name,
			'email': account.email,
			'language': account.language
		};
		dbinstance.getConnection(function (err, connection) {

			connection.query('INSERT INTO account SET ?', new_account, function (err, res) {
				if (err) throw err;

				// console.log('New account id is ', res.insertId);
				// console.log('res is ', res);

				callback(err, res.insertId);
			});
		});
	},
	getByAccountNumber: function (account_number, callback) {
		dbinstance.getConnection(function (err, connection) {
			connection.query('SELECT * from account where account_number = ?', account_number, function (err, rows, fields) {
				if (err) throw err;

				callback(err, rows[0]);
			});
		});
	},
	getByEmail: function (email, callback) {
		dbinstance.getConnection(function (err, connection) {

			connection.query('SELECT * from account where email = ?', email, function (err, rows, fields) {
				if (err) throw err;

				//console.log('getByEmail', rows[0])

				callback(err, rows[0]);
			});
		});
	}
};

module.exports = accountDAO;
