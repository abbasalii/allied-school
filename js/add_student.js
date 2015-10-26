$(function(){

	var cList = null;

	$.ajax({
		url: "/get_classlist",
		type: "get",
		success: function(response){
			if(response.code==200){
				cList = response.data;

				var text = "";
				for(var i=0; i<cList.length; i++)
					text += "<option>" + cList[i].TITLE + "</option>";
				$("#cList").html(text);
			}
			else{
				alert("404");
			}
		}
	});

	$("#cnic").change(function(){
		
		var cnic = $(this).val();
		if(cnic==null || cnic==undefined || cnic.length==0)
			return;

		$.ajax({
			url: "/get_cnic_info",
			type: "get",
			data: {id:cnic},
			success: function(response){
				if(response.code==200){
					if(response.data.length>0){
						$("#address").val(response.data[0].ADDRESS);
						$("#phone").val(response.data[0].PHONE);
						$("#fname").val(response.data[0].NAME);
					}
				}
			}
		});
	});

	$("#hide-message-box").click(function(){
		$("#messagebox").hide();
	});

	$('#form').submit(function(){

		var obj = {};
		obj['name'] = $("#name").val();
		obj['reg_no'] = $("#reg_no").val();
		obj['dob'] = $("#dob").val();
		var temp = $("#class").val().trim().toUpperCase();
		for(var i=0; i<cList.length; i++)
		{
			if(cList[i].TITLE==temp)
			{
				obj['class'] = cList[i].ID;
				break;
			}
		}
		if(obj['class']==undefined)
		{
			$("#class").focus();
			displayMessageBox("Select valid class!");
			return false;			
		}
		obj['section'] = $("#section").val();
		obj['address'] = $("#address").val();
		obj['phone'] = $("#phone").val();
		obj['fname'] = $("#fname").val();
		obj['cnic'] = $("#cnic").val();
		obj['tution'] = $("#tution").val();
		obj['transport'] = $("#transport").val();

		$.ajax({
			url: $('#form').attr('action'),
			type: "post",
			data : obj,//$('#form').serialize(),
			success: function(response){
				if(response.code==200){
					displayMessageBox("New student succesfully added");
				}
				else{
					displayMessageBox("Failed to add new student!");
				}
			}
		});
		return false;
	});

	displayMessageBox = function(msg){

		$("#user-message").html(msg);
		$("#messagebox").show();
	}
});