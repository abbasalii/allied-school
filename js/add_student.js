$(function(){
	$('#form').submit(function(){
		$.ajax({
			url: $('#form').attr('action'),
			type: "post",
			data : $('#form').serialize(),
			success: function(response){
				if(response.code==200){
					$("#messagebox").html("New student succesfully added");
					$("#messagebox").show();
				}
				else{
					$("#messagebox").html("Failed to add new student!");
					$("#messagebox").show();
				}
			}
		});
		return false;
	});
});