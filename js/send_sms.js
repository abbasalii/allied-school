Google = new function(){

	var subjects = null;

	this.displaySubjects = function(data){

		subjects = data;

		var text = "<input id='suball' type='checkbox'/>";
		text += "<label for='suball' >All</label>";
		for(var i=0; i<data.length; i++){

			text += "<input class='sub-check' id='subject"+i+"' type='checkbox'/>";
			text += "<label for='subject"+i+"' >"+data[i].TITLE+"</label>";
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

	$("#send-btn").click(function(){
		alert("Send");
	});
});