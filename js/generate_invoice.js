Google = new function(){

	var classes = null;

	this.displaySubjects = function(data){

		classes = data;

		var text = "<input id='suball' type='checkbox'/>";
		text += "<label for='suball' >All</label>";
		for(var i=0; i<data.length; i++){

			text += "<input class='sub-check' id='subject"+i+"' type='checkbox'/>";
			text += "<label for='subject"+i+"' >"+data[i].CLASS+"</label>";
		}

		$("#audience").html(text);

		$("#suball").change(function(){
			if($(this).is(':checked')){

				$(".sub-check").each(function(){
					$(this).prop('checked', true);
				});
			}
			else{
				$(".sub-check").each(function(){
					$(this).prop('checked', false);
				});
			}
		});
	}

	this.generateInvoice = function(){

		var i = 0;
		var list = [];
		$(".sub-check").each(function(){

			if($(this).prop('checked'))
				list.push(classes[i].CLASS);
			i++;
		});

		var object = {};
		object.list = list;
		object.st_date = $("#start-date").val();
		object.end_date = $("#end-date").val();
		object.due_date = $("#due-date").val();
		object.annual = $("#annual-fee").val();
		object.transport = $("#transport").val();

		$.ajax({
			url: "/generate_invoice",
			type: "post",
			data: object,
			success: function(response){
				if(response.code==200){
					alert("200");
				}
				else{
					alert("404");
				}
			}
		});		
	}
}


$(function(){

	$.ajax({
		url: "/get_classlist",
		type: "get",
		success: function(response){
			if(response.code==200){
				console.log(response.data);
				Google.displaySubjects(response.data);
			}
			else{
				alert("404");
			}
		}
	});

	$("#send-sms").change(function(){

		if($(this).is(':checked')){

			$("#sms-div").show();
		}
		else{
			$("#sms-div").hide();
		}
	});

	$("#generate-btn").click(Google.generateInvoice);
});