Google = new function(){

	var search = null;
	var ass_id = -1;
	var marksheet = null;

	this.displaySearchResult = function(data){

		search = data;

		var text = "<tr><th>INDEX</th><th>CLASS</th><th>SECTION</th><th>SUBJECT</th><th>TYPE</th><th>TOTAL MARKS</th><th>ENTER</th></tr>";

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
			$(this).click(function(){
				var ind = $(this).closest('tr').index()-1;
				ass_id = search[ind].ASS_ID;
				getMarksheet();
			});
		});
	}

	var getMarksheet = function(){
		$.ajax({
			url: "/get_marksheet",
			type: "get",
			data : {id:ass_id},
			success: function(response){
				if(response.code==200){
					console.log(response.data);
					displayMarksheet(response.data);
				}
				else{
					alert("404");
				}
			}
		});
	}

	var displayMarksheet = function(data){

		marksheet = data;

		var text = "<tr><th>INDEX</th><th>NAME</th><th>MARKS</th></tr>";
		for(var i=0; i<data.length; i++){

			text += "<tr>";

			text += "<td>" + (i+1) + "</td>";
			text += "<td>" + data[i].NAME + "</td>";
			text += "<td>" + "<input class='update-btn-class' type='number' value='"+data[i].OM+"'/>" + "</td>";

			text += "</tr>";
		}

		$("#marksheet").html(text);

		$("#marksheet-div").show();
	}

	this.updateMarks = function(){

		var list = [];
		$(".update-btn-class").each(function(){

			var obj = {};
			var marks = $(this).val();
			var ind = $(this).closest('tr').index()-1;
			var id = marksheet[ind].STD_ID;
			var mid = marksheet[ind].M_ID;

			obj['STD_ID'] = id;
			obj['M_ID'] = mid;
			obj['OM'] = marks;

			// console.log(obj);
			list.push(obj);
		});

		//watchout for errors!!!
		$.ajax({
			url: "/update_marksheet",
			type: "post",
			data : {id:ass_id,marks:list},
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

	$("#update-marks").click(function(){
		Google.updateMarks();
	});
});