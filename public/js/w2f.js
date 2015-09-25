$(document).ready(function () {

	$.ajax({
			url:"/toGetTheFirstQuestion",
			success:function(result){
				//alert("success");
				$("#questionHolder").append(result);
			},
			error:function(result){


			}
		});


	$(document).on('click','.response',function(){

console.log("called called");
		console.log(this.value);

		$.ajax({
			url:"/nextSurvey?nextRoute="+ this.value,
			success:function(result){
				//alert("success");
				$("#questionHolder").append(result);
			},
			error:function(result){


			}
		});


	});

	$(document).on('click','#create',function(){

console.log("called called");
		console.log(this.value);

		$.ajax({
			url:"/nextSurvey?nextRoute="+ this.value,
			success:function(result){
				//alert("success");
				$("#questionHolder").html("");
				$("#questionHolder").append(result);
			},
			error:function(result){


			}
		});


	});

});