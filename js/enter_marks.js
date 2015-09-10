Google = new function(){

	var search = null;
	var ass_id = -1;
	var marksheet = null;
	var cList = null;

	this.setClassDataList = function(data){

		cList = data;

		var text = "";
		for(var i=0; i<cList.length; i++)
			text += "<option>" + cList[i].TITLE + "</option>";
		$("#cList").html(text);
	}

	this.displaySearchResult = function(data){

		search = data;

		var text = "<tr><th>INDEX</th><th>CLASS</th><th>SECTION</th><th>SUBJECT</th><th>TYPE</th><th>TOTAL MARKS</th><th>ENTER</th></tr>";

		for(var i=0; i<data.length; i++){

			text += "<tr>";

			text += "<td class='center'>" + (i+1) + "</td>";
			for(var j=0; j<cList.length; j++){
				if(cList[j].ID==data[i].CLASS){
					text += "<td>" + cList[j].TITLE + "</td>";
					break;
				}
			}
			
			text += "<td class='center'>" + data[i].SECTION + "</td>";
			text += "<td>" + data[i].SUBJECT + "</td>";
			text += "<td>" + data[i].TYPE + "</td>";
			text += "<td class='center'>" + data[i].TM + "</td>";
			text += "<td class='center'>" + "<input class='edit-btn-class' type='button' value='Edit'/>" + "</td>";

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

			text += "<td class='center'>" + (i+1) + "</td>";
			text += "<td class='student-name-class'>" + data[i].NAME + "</td>";
			text += "<td>" + "<input class='input-field marks-field' type='number' value='"+data[i].OM+"'/>" + "</td>";

			text += "</tr>";
		}

		$("#marksheet").html(text);

		$("#marksheet-div").show();
	}

	this.updateMarks = function(){

		var list = [];
		$(".marks-field").each(function(){

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

	this.findClassId = function(title){

		for(var i=0; i<cList.length; i++)
			if(cList[i].TITLE==title)
				return cList[i].ID;

		return null;
	}
}


$(function(){

	$.ajax({
		url: "/get_classlist",
		type: "get",
		success: function(response){
			if(response.code==200){
				Google.setClassDataList(response.data);
			}
			else{
				alert("404");
			}
		}
	});

	$("#show-assessment-div").click(function(){
		$("#add-assessment-div").show();
	});

	$("#hide-assessment-div").click(function(){
		$("#add-assessment-div").hide();
	});

	$('#add-form').submit(function(){

		var obj = {};

		var clas = $("#assessment-class").val().trim().toUpperCase();
		obj['class'] = Google.findClassId(clas);
		obj['section'] = $("#assessment-section").val();
		obj['subject'] = $("#assessment-subject").val();
		obj['type'] = $("#assessment-name").val();
		obj['total'] = $("#assessment-total").val();
		obj['date'] = $("#ass_date").val();

		$.ajax({
			url: $('#add-form').attr('action'),
			type: "post",
			data : obj,//$('#add-form').serialize(),
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

		var obj = {};

		var clas = $("#search-class").val().trim().toUpperCase();
		obj['class'] = Google.findClassId(clas);
		obj['section'] = $("#search-section").val();
		obj['subject'] = $("#search-subject").val();
		obj['type'] = $("#search-type").val();
		obj['ass_date'] = $("#search-date").val();

		$.ajax({
			url: $('#search-form').attr('action'),
			type: "get",
			data : obj,//$('#search-form').serialize(),
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

	$("#hide-marksheet-div").click(function(){
		$("#marksheet-div").hide();
	});

	$("#update-marks").click(function(){
		Google.updateMarks();
	});
});