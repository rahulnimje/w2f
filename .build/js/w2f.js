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


		console.log(this.value);
		var that = $(this);

		$.ajax({
			url:"/nextSurvey?nextRoute="+ this.value,
			success:function(result){
				console.log(that);
				that.prop("disabled",true);
				that.parent().siblings().children('.response').prop("disabled",true);
				that.parent().siblings().children('.response').removeClass('btn-primary').addClass('btn-default').css("background-color","grey");

if(that.data("id")=="yes") {
	console.log(that.parent().siblings("div.resultArrow"));
	that.closest(".questionTemplate").siblings("div.resultArrow").html('<div class=" col-md-offset-1"><span class="arrow-success-large" data-angle="180" style="transform: rotate(180deg);"></span></div>');
}else{
	that.closest(".questionTemplate").siblings("div.resultArrow").html('<div class=" col-md-offset-3"><span class="arrow-danger-large" data-angle="180" style="transform: rotate(180deg);"></span></div>');
}
				$("#questionHolder").append(result);
			//	$('.downarrows').css('display', 'block');
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