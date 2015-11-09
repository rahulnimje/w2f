var Converter = require("csvtojson").Converter;
var _ = require("underscore");

var fs = require("fs");
//CSV File Path or CSV String or Readable Stream Object
var csvFileName = "surveyData.csv";
var path = require('path');

var json_lookup = {},
	uniquetags = {};

// load data at startup for later use.
loadData();

function loadData() {
	console.log('Load surveyData ...')
	var context = path.resolve(__dirname, '../data'),
		csvPath = path.resolve(context, csvFileName);
	var csvConverter = new Converter();
	uniquetags=[];
	csvConverter.on("end_parsed", function (jsonObj) {

			//console.log("JSON survey data ");
			//console.log(JSON.stringify(jsonObj));

			for (var k in jsonObj) {
				//console.log(jsonObj[k]);
				json_lookup[jsonObj[k].uniqueTag] = jsonObj[k];
				if(!_.findWhere(uniquetags,{area : jsonObj[k].area}))
				 uniquetags.push({area : jsonObj[k].area, firstTag: jsonObj[k].uniqueTag});
			}
		}
	);
	fs.createReadStream(csvPath).pipe(csvConverter);

};


module.exports = {
	get: function (uniqueTag) {
		return json_lookup[uniqueTag];
	},
	getAllTags: function () {
		// console.log(uniquetags);
		return uniquetags;
	}
}









