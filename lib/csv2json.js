var Converter=require('csvtojson').Converter;
var csvConverter=new Converter({constructResult:false,ignoreEmpty:true}); 
var jsonFile=require('jsonFile');
var readStream=require("fs").createReadStream('../data/w2f.csv');


csvConverter.on("record_parsed",function(jsonObj){
	var fileName= jsonObj.uniqueTag;
	console.log(fileName);
	jsonFile.writeFile("../data/"+fileName+".json",jsonObj);
});
csvConverter.on("end_parsed", function()
{
console.log(" Creating JSON files completed");
});
readStream.pipe(csvConverter);
