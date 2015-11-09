'use strict';
var mysql = require('mysql');
var dbconfig = require('../config/config.json').dbconfig;

var pool = mysql.createPool(dbconfig);

var dbinstance = {
	getConnection: function(callback) {
		pool.getConnection(function (err, connection) {
			callback(err, connection);
		});
	}
};

module.exports = dbinstance;