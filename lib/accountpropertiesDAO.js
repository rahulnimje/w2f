'use strict';
var dbinstance = require('../lib/dbinstance');

var accountpropertiesDAO = {
	createAccountProperties: function (account, callback) {

		var account_properties = {
			'account_number': account.account_number || 99999, // temporarily hardcode for now until Tejas pass back the account number
			'name': account.name,
			'value': account.value
		};

		dbinstance.getConnection(function(err, connection) {
			connection.query('SELECT * from accountproperties where account_number = ? and name = ?',
				[account_properties.account_number, account_properties.name], function (err, rows, fields) {

					if (err === null) {
						if (rows.length === 0) {
							//console.log("INSERT");
							connection.query('INSERT INTO accountproperties SET ?', account_properties, function (err, res) {
								if (err) throw err;

								callback(err);

							});

						} else {
							//console.log("UPDATE");
							connection.query('UPDATE accountproperties SET value = ? where account_number = ? and name = ?',
								[account_properties.value, account_properties.account_number, account_properties.name], function (err, res) {
									if (err) throw err;

									callback(err);

								});
						}
					} else {
						console.log('ERROR in createAccountProperties')
						callback(err);
					}

				});
		});

	}
};

module.exports = accountpropertiesDAO;
