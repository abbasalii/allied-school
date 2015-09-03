$(function(){
	$('#form').submit(function(){
		$.ajax({
			url: $('#form').attr('action'),
			type: "get",
			data : $('#form').serialize(),
			success: function(response){
				if(response.code==200){

					console.log(response.data);
					displayReport(response.data);
				}
				else{
					alert("404");
				}
			}
		});
		return false;
	});

	var displayReport = function(data){

		var students = [];
		var subjects = [];
		for(var i=0; i<data.length; i++){

			for(var j=0; j<students.length; j++){
				var found = false;
				if(students[j].ID==data[i].STD_ID){
					found = true;
					break;
				}
			}
			if(!found)
				students.push({ID:data[i].STD_ID, NAME:data[i].NAME});

			for(var j=0; j<subjects.length; j++){
				var found = false;
				if(subjects[j].ID==data[i].SUB_ID){
					found = true;
					break;
				}
			}
			if(!found)
				subjects.push({ID:data[i].SUB_ID, NAME:data[i].SUBJECT});
		}

		var coltotal = [];
		var colobtain = [];
		var text = "<tr>";
		text += "<th>STUDENT</th>";
		for(var i=0; i<subjects.length; i++){
			text += "<th>" + subjects[i].NAME +"</th>";
			coltotal.push(0);
			colobtain.push(0);
		}
		text += "<th>TOTAL</th>";
		text += "</tr>";

		for(var i=0; i<students.length; i++){

			var rowtotal = 0;
			var rowobtain = 0;
			text += "<tr>";
			text += "<td>" + students[i].NAME + "</td>";
			for(var j=0; j<subjects.length; j++){

				var subtotal = 0;
				var subobtain = 0;
				text += "<td>";
				for(var k=0; k<data.length; k++){
					if(students[i].ID==data[k].STD_ID && subjects[j].ID==data[k].SUB_ID){
						subtotal += data[k].TM;
						subobtain += data[k].OM;
					}
				}
				rowtotal += subtotal;
				rowobtain += subobtain;

				coltotal[j] += subtotal;
				colobtain[j] += subobtain;

				if(subtotal>0){
					text += ((subobtain*100)/subtotal).toFixed(2);
				}
				text += "</td>";
			}
			text += "<td>";
			if(rowtotal>0){
				text += ((rowobtain*100)/rowtotal).toFixed(2);
			}
			text += "</td>";
			text += "</tr>";
		}

		text += "<tr>";
		text += "<td>CLASS</td>";
		var total = 0;
		var obtain = 0;

		for(var i=0; i<subjects.length; i++){
			total += coltotal[i];
			obtain += colobtain[i];
			text += "<td>";
			if(coltotal[i]>0)
				text += ((colobtain[i]*100)/coltotal[i]).toFixed(2);
			text += "</td>";
		}
		text += "<td>" + ((obtain*100)/total).toFixed(2) + "</td>";
		text += "</tr>";

		$("#report-tab").html(text);
	}
});