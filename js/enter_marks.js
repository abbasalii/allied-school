Google = new function(){

	var search = null;

	this.displaySearchResult = function(data){

		search = data;

		var text = "<tr><th>INDEX</th><th>CLASS</th><th>SECTION</th><th>SUBJECT</th><th>TYPE</th><th>TOTAL MARKS</th><th>ENTER</th><tr>"

		for(var i=0; i<data.length; i++){

			text += "<tr>";

			text += "<td>" + (i+1) + "</td>";
			text += "<td>" + data[i].CLASS + "</td>";
			text += "<td>" + data[i].SECTION + "</td>";
			text += "<td>" + data[i].SUBJECT + "</td>";
			text += "<td>" + data[i].TYPE + "</td>";
			text += "<td>" + data[i].TM + "</td>";
			text += "<td>" + "<input class='edit-btn-class' type='button' value='Edit'/>" + "</td>";

			text += "</tr>";
		}

		$("#search-result").html(text);

		$(".edit-btn-class").each(function(){
			$(this).click(getMarksheet);
		});
	}

	var getMarksheet = function(){
		
	}
}


$(function(){
	$('#add-form').submit(function(){
		$.ajax({
			url: $('#add-form').attr('action'),
			type: "post",
			data : $('#add-form').serialize(),
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
		return false;
	});

	$('#search-form').submit(function(){
		$.ajax({
			url: $('#search-form').attr('action'),
			type: "get",
			data : $('#search-form').serialize(),
			success: function(response){
				if(response.code==200){
					console.log(response.data);
					Google.displaySearchResult(response.data);
				}
				else{
					alert("404");
				}
			}
		});
		return false;
	});
});