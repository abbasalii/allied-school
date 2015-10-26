$(function(){
	$("#promote").click(function( event ) {

		event.preventDefault();
		displayMessageBox("Type 'Confirm' to promote students");
		$("#confirm-message").val("");
		$("#cancel-promotion").show();
		$("#confirm-message").show();
		$("#hide-message-box").val("Proceed");

		$("#hide-message-box").unbind("click");
		$("#hide-message-box").click(function(){
			if($("#confirm-message").val()=="Confirm"){

				$("#user-message").html("All students have been promoted to next class");
				$("#confirm-message").hide();
				$("#hide-message-box").val("OK");
				$("#cancel-promotion").hide();

				$("#hide-message-box").unbind("click");
				$("#hide-message-box").click(function(){

					$("#messagebox").hide();
				});
			}
		});
	 //  	$.ajax({
		// 	url: "/promote_students",
		// 	type: "post",
		// 	success: function(response){
		// 		if(response.code==200){
		// 			// console.log(response.data);
		// 			alert("200");
		// 		}
		// 		else{
		// 			alert("404");
		// 		}
		// 	}
		// });
	});

	$("#cancel-promotion").click(function(){
		$("#messagebox").hide();
	});

	displayMessageBox = function(msg){

		$("#user-message").html(msg);
		$("#messagebox").show();
	}
});