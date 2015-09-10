$(function(){
	$("#promote").click(function( event ) {

	  event.preventDefault();
	  $.ajax({
			url: "/promote_students",
			type: "post",
			success: function(response){
				if(response.code==200){
					// console.log(response.data);
					alert("200");
				}
				else{
					alert("404");
				}
			}
		});
	});
});