

var Converter = require("csvtojson").Converter;

var fs = require("fs");
//CSV File Path or CSV String or Readable Stream Object
var csvFileName = "w2f.csv";
var path = require('path');

var json_lookup = {};


function loadData() {
	console.log('***** load ******************')
	var context = path.resolve(__dirname, '../data'),
		csvPath = path.resolve(context, csvFileName);
	var csvConverter = new Converter();
	csvConverter.on("end_parsed", function (jsonObj) {

			for (var k in jsonObj) {
				//console.log(jsonObj[k]);
				json_lookup[jsonObj[k].uniqueTag] = jsonObj[k];
			}
		}
	);


	fs.createReadStream(csvPath).pipe(csvConverter);

};


module.exports = {
	load: function() {
		loadData();
	},
	get: function(uniqueTag) {
		return json_lookup[uniqueTag];
	}
}









