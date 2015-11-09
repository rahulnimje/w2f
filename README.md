work2future
===========

work2future survey app
Developed by PayPal for Small Business Challenge

If running the server for the first, install the dependent node_modules:
npm install

To start the server:
npm start
or
node server.js

To access from localhost:
http://localhost:8000

Database credential is stored in:
config/config.json

Database schema:
CREATE TABLE `account` (
  `account_number` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(64) DEFAULT '',
  `last_name` varchar(64) DEFAULT '',
  `email` varchar(127) NOT NULL DEFAULT '',
  `language` varchar(5) DEFAULT '',
  UNIQUE KEY `account_number` (`account_number`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `accountproperties` (
  `account_number` bigint(20) unsigned NOT NULL,
  `name` varchar(64) NOT NULL DEFAULT '',
  `value` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`account_number`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

Questionairs and Content:
- All questions and resources routes should be modified in data/surveyData.csv
- All the corresponding text are localized in locale/US/en/localeMessages.properties, locale/US/es/localeMessages.properties, locale/US/vn/localeMessages.properties
- Please note that new propertykey added to data/surveyData.csv should also defined in localeMessages.properties file.   Also, propertykey is
  used in the analytic data (i.e. account_properties table).