Google = new function(){

	var subjects = null;

	this.displaySubjects = function(data){

		subjects = data;

		var text = "<div><input id='suball' type='checkbox'/>";
		text += "<label for='suball' >All</label></div>";
		text += "<div>";
		for(var i=0; i<data.length; i++){

			text += "<input class='sub-check' id='subject"+i+"' type='checkbox'/>";
			text += "<label for='subject"+i+"' >"+data[i].TITLE+"</label>";
		}
		text += "</div>";

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

	this.displayMessageBox = function(msg){

		$("#user-message").html(msg);
		$("#messagebox").show();
	}

	this.sendNotification = function(){

		var i = 0;
		var cList = [];
		var obj = {};
		$(".sub-check").each(function(){
			if($(this).prop('checked'))
				cList.push(subjects[i].ID);
			i++;
		});
		if(cList.length==0)
		{
			this.displayMessageBox("No class is selected!");
			return;			
		}
		var msg = $("#sms-area").val().trim();
		if(msg.length==0)
		{
			this.displayMessageBox("Message field is empty!");
			return;			
		}
		obj['list'] = cList;
		obj['msg'] = msg;

		$.ajax({
			url: "/send_sms",
			type: "post",
			data : obj,//$('#form').serialize(),
			success: function(response){
				if(response.code==200){

					$("#suball").prop('checked', false);
					$(".sub-check").each(function(){
						$(this).prop('checked', false);
					});
					$("#sms-area").val("");

					var obj = JSON.parse(response.data);
					console.log(obj["return"]);
					if(obj["return"]==true) {
						var noOfMsg = response.num;
						var msgLeft = obj["remaining_quota"];
						if(msgLeft>noOfMsg-1)
							Google.displayMessageBox("Sending SMS...Please don't turn off the system for few seconds");
						else
							Google.displayMessageBox("Your SMS package has been consumed. Please resubscribe");
					}
					else{
						Google.displayMessageBox(obj["response_message"]);
					}
				}
				else{
					Google.displayMessageBox("Sending failed! Please check your internet connection");
				}
			}
		});
	}
}


$(function(){

	$("#hide-message-box").click(function(){
		$("#messagebox").hide();
	});

	$.ajax({
		url: "/get_classlist",
		type: "get",
		success: function(response){
			if(response.code==200){
				// console.log(response.data);
				Google.displaySubjects(response.data);
			}
			else{
				alert("404");
			}
		}
	});	

	$("#send-btn").click(function(){
		Google.sendNotification();
	});
});