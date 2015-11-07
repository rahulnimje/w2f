var Converter = require("csvtojson").Converter;

var fs = require("fs");
//CSV File Path or CSV String or Readable Stream Object
var csvFileName = "surveyForm.csv";
var path = require('path');

var json_lookup = {};

// load data at startup for later use.
loadData();

function loadData() {
    console.log('Load surveyForm...')
    var context = path.resolve(__dirname, '../data'),
        csvPath = path.resolve(context, csvFileName);
    var csvConverter = new Converter();
    csvConverter.on("end_parsed", function (jsonObj) {


            console.log("JSON survey form ");
            console.log(JSON.stringify(jsonObj));
            for (var k in jsonObj) {
                //console.log(jsonObj[k]);
                json_lookup[jsonObj[k].uniqueTag] = jsonObj[k];
            }

            // console.log(JSON.stringify(json_lookup));
        }
    );


    fs.createReadStream(csvPath).pipe(csvConverter);

};


module.exports = {
    get: function (uniqueTag) {
        return json_lookup[uniqueTag];
    }
}


