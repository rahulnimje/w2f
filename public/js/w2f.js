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

	$(document).on('change','#language',function(){

		$.ajax({
			url:"/toGetTheFirstQuestion?language="+$(this).val(),
			success:function(result){
				//alert("success");
				$("#questionHolder").html(result);
			},
			error:function(result){


			}
		});

	});



	$(document).on('click','.response',function(){


		console.log(this.value);
		var that = $(this);

		$.ajax({
			url:"/nextSurvey?nextRoute="+ this.value+"&language="+$(this).data("lang")+"&account_number="+$(this).data("acc")+"&analytic_name="+$(this).data("analytic_name")+"&analytic_value="+$(this).data("analytic_value"),
			success:function(result){
				console.log(that);
				that.prop("disabled",true);
				that.parent().siblings().children('.response').prop("disabled",true);
				that.parent().siblings().children('.response').removeClass('btn-primary').addClass('btn-default').css("background-color","grey");
var areaName = $('#panelarea').val()
				//$("[id='"+areaName +"']") .addClass('active');
if(that.data("id")=="yes") {
	console.log(that.parent().siblings("div.resultArrow"));
	that.closest(".questionTemplate").siblings("div.resultArrow").html('<div class=" col-md-offset-1"><span class="arrow-success-large" data-angle="180" style="transform: rotate(180deg);"></span></div>');
}else{
	that.closest(".questionTemplate").siblings("div.resultArrow").html('<div class=" col-md-offset-3"><span class="arrow-danger-large" data-angle="180" style="transform: rotate(180deg);"></span></div>');
}
				$('.panel').removeClass('active');
				$("#questionHolder").append(result);

				$("[id='"+$(result).find('#panelarea').val() +"']").addClass('active');
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
			type:"POST",
			url:"/createAccount?nextRoute="+ this.value,
			data:$("#createUser").serialize(),
			success:function(result){
				//alert("success");
				$("#questionHolder").html("");
				$("#questionHolder").append(result);
			},
			error:function(result){


			}
		});

		return false;
	});

	$(document).on('click','#skip',function(){

		console.log("called called");
		console.log(this.value);

		$.ajax({
			type:"POST",
			url:"/createAccount?nextRoute="+ this.value + "&skip_create_account=true",
			data:$("#createUser").serialize(),
			success:function(result){
				//alert("success");
				$("#questionHolder").html("");
				$("#questionHolder").append(result);
			},
			error:function(result){


			}
		});

		return false;
	});
});