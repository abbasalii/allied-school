Google = new function(){

	var result = null;
	var ind = -1;
	var parent = null;
	var tests = null;
	var challan = null;
	var chalind = -1;

	this.displayResult = function(data){

		result = data;

		var text = "<tr><th>INDEX</th><th>REG #</th><th>NAME</th><th>CLASS</th><th>SECTION</th><th>VIEW</th></tr>";
		for(var i=0; i<data.length; i++){
			text += "<tr>";
			text += "<td>" + (i+1) + "</td>";
			text += "<td>" + data[i].REG_NO + "</td>";
			text += "<td>" + data[i].NAME + "</td>";
			text += "<td>" + data[i].CLASS + "</td>";
			text += "<td>" + data[i].SECTION + "</td>";
			text += "<td>" + "<input class='detail-btn-class' type='button' value='View'/>" + "</td>";
			text += "</tr>";
		}

		$("#search-result-tab").html(text);

		$(".detail-btn-class").each(function(){
			$(this).click(function(){
				ind = $(this).closest('tr').index() - 1;
				var id = result[ind].P_ID;
				$.ajax({
					url: '/student_detail',
					type: "get",
					data : { pid: id},
					success: function(response){
						if(response.code==200){
							parent = response.data[0];
							$("#student-name").val(result[ind].NAME);
							$("#student-reg").val(result[ind].REG_NO);
							$("#student-class").val(result[ind].CLASS);
							$("#student-section").val(result[ind].SECTION);
							$("#parent-name").val(parent.NAME);
							$("#parent-cnic").val(parent.CNIC);
							$("#student-phone").val(parent.PHONE);
							$("#student-address").val(parent.ADDRESS);
							$("#student-div").show();

							$("#get-result-btn").unbind("click");
							$("#get-result-btn").click(getResult);
							$("#get-fee-btn").unbind("click");
							$("#get-fee-btn").click(getFeeHistory);
						}
						else{
							alert("404");
						}
					}
				});
			});
		});
	}

	var getResult = function(){
		$.ajax({
			url: "/student_result",
			type: "get",
			data : { id: result[ind].ID},
			success: function(response){
				if(response.code==200){
					console.log(response.data);
					displayTests(response.data);
				}
				else{
					alert("404");
				}
			}
		});
	}

	var displayTests = function(data){

		tests = data;
		var sub = [];
		var ass = [];

		for(var i=0; i<tests.length; i++){

			var found = false;
			for(var j=0; j<sub.length; j++){
				if(sub[j]==tests[i].NAME){
					found = true;
					break;
				}
			}
			if(!found){
				sub.push(tests[i].NAME);
			}

			found = false;
			for(var j=0; j<ass.length; j++){
				if(ass[j]==tests[i].TYPE){
					found = true;
					break;
				}
			}
			if(!found){
				ass.push(tests[i].TYPE);
			}
		}

		var cols = ["SUBJECT"];
		var assum = [];
		var assob = [];
		for(var i=0; i<ass.length; i++){
			cols.push(ass[i]);
			assum.push(0);
			assob.push(0);
		}
		cols.push("TOTAL");
		cols.push("PERCENTAGE");

		var text = "<table>";
		text += "<tr>";
		for(var i=0; i<cols.length; i++)
			text += "<th>" + cols[i] + "</th>";
		text += "</tr>";

		for(var i=0; i<sub.length; i++){
			text += "<tr>";

			text += "<td>" + sub[i] + "</td>";

			var sum = 0;
			var total = 0;
			for(var j=0; j<ass.length; j++){

				text += "<td>";

				for(var k=0; k<tests.length; k++){
					if(tests[k].NAME==sub[i] && tests[k].TYPE==ass[j]){

						text += tests[k].OBTAINED + "/" + tests[k].TOTAL_MARKS;
						sum += tests[k].OBTAINED;
						assob[j] += tests[k].OBTAINED;
						total += tests[k].TOTAL_MARKS;
						assum[j] += tests[k].TOTAL_MARKS;
						break;
					}
				}

				text += "</td>";
			}

			text += "<td>"+ sum + "/" + total + "</td>";
			text += "<td>"+ ((sum*100)/total).toFixed(2) +"</td>";

			text += "</tr>";
		}

		text += "<tr>";

		text += "<td>TOTAL:-</td>";
		var cumtotal = 0;
		var cumobt = 0;
		for(var i=0; i<assum.length; i++){

			text += "<td>" + assob[i] + "/" + assum[i] + "</td>";
			cumtotal += assum[i];
			cumobt += assob[i];
		}

		text += "<td>"+cumobt+"/"+cumtotal+"</td>";
		text += "<td>"+((cumobt*100)/cumtotal).toFixed(2)+"</td>";

		text += "</tr>";

		text += "</table>";

		$("#student-result-div").html(text).show();
	}

	var getFeeHistory = function(){
		$.ajax({
			url: "/student_fee_history",
			type: "get",
			data : { id: result[ind].ID},
			success: function(response){
				if(response.code==200){
					console.log(response.data);
					displayChallans(response.data);
				}
				else{
					alert("404");
				}
			}
		});
	}

	var displayChallans = function(data){
		challan = data;

		var text = "<tr><th>INDEX</th><th>FOR</th><th>AMOUNT DUE</th><th>DUE DATE</th><th>STATUS</th><th>VIEW</th></tr>";

		for(var i=0; i<data.length; i++){


			var status = "PAID";
			if(data[i].STATUS==0)
				status = "UNPAID";

			text += "<tr>";

			text += "<td>" + (i+1) + "</td>";
			text += "<td>" + formatD(data[i].ST_MON)+" to "+ formatD(data[i].END_MON) + "</td>";
			text += "<td>" + totalFee(data[i]) + "</td>";
			text += "<td>" + formatD(data[i].DUE_DATE) + "</td>";
			text += "<td>" + status + "</td>";
			text += "<td>" + "<input class='view-result-class' type='button' value='View'/>" + "</td>";

			text += "</tr>";
		}

		$("#student-fee-tab").html(text);
		$("#student-fee-div").show();

		$(".view-result-class").each(function(){
			$(this).click(function(){
				chalind = $(this).closest('tr').index() - 1;
				displayDetailChallan();
			});
		});
	}

	var formatD = function(date){
		return new Date(date).toLocaleDateString();
	}

	var totalFee = function(data){
		var due = 0;
		if(data.ADMISSION_FEE)
			due += data.ADMISSION_FEE;
		if(data.TUTION_FEE)
			due += data.TUTION_FEE;
		if(data.SECURITY)
			due += data.SECURITY;
		if(data.ANNUAL_FEE)
			due += data.ANNUAL_FEE;
		if(data.PROCESS_FEE)
			due += data.PROCESS_FEE;

		return due;
	}

	var displayDetailChallan = function(){

		var fee = challan[chalind];
		$("#fee-for").html(formatD(fee.ST_MON)+" to "+formatD(fee.END_MON));
		var money = fee.ADMISSION_FEE;
		if(money==null || money==0)
			money = "None";
		$("#admission").html(money);

		var money = fee.TUTION_FEE;
		if(money==null || money==0)
			money = "None";
		$("#tution").html(money);

		var money = fee.SECURITY;
		if(money==null || money==0)
			money = "None";
		$("#security").html(money);

		var money = fee.ANNUAL_FEE;
		if(money==null || money==0)
			money = "None";
		$("#annual").html(money);

		var money = calculateFine(fee);
		var world = money;
		if(money==null || money==0)
			world = "None";
		$("#fine").html(world);

		var hello = totalFee(fee);
		if(money>0)
			hello += money;
		$("#amount-due").html(hello);

		$("#issue-date").html(formatD(fee.ISSUE_DATE));
		$("#due-date").html(formatD(fee.DUE_DATE));
		$("#pay-date").html(formatD(fee.PAY_DATE));
		console.log(fee.PAY_DATE);
		$("#amount-paid").html(fee.AMOUNT_PAID);

		$("#student-challan-div").show();
	}

	var calculateFine = function(data){

		if(new Date() < new Date(data.DUE_DATE))
			return 0;
		var diff =  Math.floor(( Date.parse(new Date()) - Date.parse(data.DUE_DATE) ) / 86400000);
		return diff*10;
	}
}


$(function(){
	$('#form').submit(function(){
		$.ajax({
			url: $('#form').attr('action'),
			type: "post",
			data : $('#form').serialize(),
			success: function(response){
				if(response.code==200){
					// console.log(response.data);
					Google.displayResult(response.data);
				}
				else{
					alert("404");
				}
			}
		});
		return false;
	});
});