var PORT = 8080;

var mysql 	= require('mysql');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var rand = require('random-key');
var app = express();
var pool 	=    mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    port 	 : 3306,
    user     : 'root',
    password : 'lionking',
    database : 'allied_school',
    debug    :  false
});

app.use(cookieParser());
app.use(session({secret: rand.generate(64)}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('js'));
app.use(express.static('css'));

app.get('/home',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/home.html');
	}
	else{
		res.redirect('/login');
	}
});

app.get('/login',function(req, res){

	if(req.session.login){
		res.redirect('/home');
	}
	else{
		res.sendFile(__dirname +'/html/login.html');
	}
});

app.post('/login',function(req,res){

	var user = req.body.user;
	var pass = req.body.pass;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		connection.query('SELECT * FROM USER',
			function(err,rows,fields) {
				if(err){
					console.log("Failed to fetch users");
					connection.release();
					res.json({"code":500});
				}
				else{
					connection.release();
					for(var i=0; i<rows.length; i++){
						if(rows[i]['USER_NAME']==user && rows[i]['PASSWORD']==pass){
							req.session.login = user;
							res.json({"code":200});
							return;
						}
					}
					res.json({"code":304});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/logout',function(req, res){

	delete req.session.login;
	res.redirect('/login');
});

app.get('/add_student',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/add_student.html');
	}
	else{
		res.redirect('/login');
	}
});

app.post('/add_student',function(req,res){

	var name = req.body.name;
	var reg_no = req.body.reg_no;
	var dob = req.body.dob;
	var clas = req.body.class;
	var section = req.body.section;
	var address = req.body.address;
	var phone = req.body.phone;
	var fname = req.body.fname;
	var cnic = req.body.cnic;
	console.log("DOB: "+dob);

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT * FROM PARENT WHERE CNIC=?';
		connection.query(query, [cnic],
			function(err,rows,fields) {

				if(err){
					console.log("Failed to fetch users");
					connection.release();
					res.json({"code":500});
				}
				else if(rows.length==0){
					query = 'INSERT INTO PARENT (NAME, CNIC, ADDRESS, PHONE) VALUES (?,?,?,?)';
					connection.query(query,[fname,cnic,address,phone],
						function(err,rows,fields){
							if(err){
								console.log("Failed to run parent insert query");
								connection.release();
								res.json({"code":500});
							}
							else{
								query = 'INSERT INTO STUDENT (REG_NO, NAME, DOB, P_ID, CLASS, SECTION) VALUES (?,?,?,?,?,?)';
								connection.query(query,[reg_no,name,dob,rows.insertId, clas, section],
									function(err,rows,fields){

										connection.release();
										if(err){
											console.log("Failed to run child insert query");
											res.json({"code":500});
										}
										else{
											res.json({"code":200});
										}
									}
								);			
							}
						}
					);
				}
				else{
					query = 'INSERT INTO STUDENT (REG_NO, NAME, DOB, P_ID, CLASS, SECTION) VALUES (?,?,?,?,?,?)';
					connection.query(query,[reg_no,name,dob,rows[0]['ID'], clas, section],
						function(err,rows,fields){

							connection.release();
							if(err){
								console.log("Failed to run child insert query");
								res.json({"code":500});
							}
							else{
								res.json({"code":200});
							}
						}
					);
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/search_student',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/search_student.html');
	}
	else{
		res.redirect('/login');
	}
});

app.post('/search_student',function(req,res){

	var name = req.body.name;
	var reg_no = req.body.reg_no;
	var clas = req.body.class;
	var section = req.body.section;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query;
		var values = [];
		if(reg_no){
			query = 'SELECT * FROM STUDENT WHERE REG_NO = ?';
			values.push(reg_no);
		}
		else{
			var like = "%";
			if(name)
				like += name + "%";
			query = 'SELECT * FROM STUDENT WHERE NAME LIKE ?';
			values.push(like);

			if(clas){
				query += ' AND CLASS=?';
				values.push(clas);

				if(section){
					query += ' AND SECTION=?';
					values.push(section);
				}
			}
		}

		connection.query(query, values,
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch users");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/student_detail',function(req, res){

	var id = req.query.pid;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT * FROM PARENT WHERE ID = ?';

		connection.query(query, [id],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch parent of child");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/student_result',function(req, res){

	var id = req.query.id;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT SUBJECT.ID "SUB_ID", SUBJECT.NAME, ASSESSMENT.TYPE, ASSESSMENT.TOTAL_MARKS, MARKS.OBTAINED FROM SUBJECT, ASSESSMENT, MARKS'
					+ ' WHERE MARKS.ASS_ID=ASSESSMENT.ID'
					+ ' and ASSESSMENT.SUB_ID=SUBJECT.ID'
					+ ' and MARKS.STD_ID=?'
					+ ' ORDER BY ASSESSMENT.A_DATE';

		connection.query(query, [id],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch student result");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/student_fee_history',function(req, res){

	var id = req.query.id;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT * FROM CHALLAN WHERE STD_ID=?';

		connection.query(query, [id],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch student fee history");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.post('/pay_invoice',function(req,res){

	var id = req.body.id;
	var amount = req.body.amount;
	var date = req.body.date;


	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'UPDATE CHALLAN SET PAY_DATE=?, AMOUNT_PAID=?, STATUS=2 WHERE ID=?';

		connection.query(query, [date,amount,id],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to update challan status");
					res.json({"code":500});
				}
				else{
					res.json({"code":200});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/generate_invoice',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/generate_invoice.html');
	}
	else{
		res.redirect('/login');
	}
});

app.get('/print_invoice',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/print_invoice.html');
	}
	else{
		res.redirect('/login');
	}
});

app.get('/send_sms',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/send_sms.html');
	}
	else{
		res.redirect('/login');
	}
});

app.get('/get_classlist',function(req, res){

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT DISTINCT CLASS FROM STUDENT';

		connection.query(query,
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch classlist");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});

});

app.get('/view_report',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/view_report.html');
	}
	else{
		res.redirect('/login');
	}
});

app.get('/get_report',function(req, res){

	var clas = req.query.class;
	var section = req.query.section;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT STUDENT.ID "STD_ID", STUDENT.NAME, SUBJECT.ID "SUB_ID",'
				  + ' SUBJECT.NAME "SUBJECT", ASSESSMENT.TYPE "TYPE", ASSESSMENT.TOTAL_MARKS "TM",'
				  + ' MARKS.OBTAINED "OM" FROM SUBJECT, ASSESSMENT, MARKS, STUDENT WHERE STUDENT.CLASS=?'
				  + ' AND STUDENT.SECTION=? AND STUDENT.ID=MARKS.STD_ID AND MARKS.ASS_ID=ASSESSMENT.ID'
				  + ' AND ASSESSMENT.SUB_ID=SUBJECT.ID;';

		connection.query(query, [clas,section],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch class reports");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});

});

app.get('/enter_marks',function(req, res){

	if(req.session.login){
		res.sendFile(__dirname +'/html/enter_marks.html');
	}
	else{
		res.redirect('/login');
	}
});

app.post('/add_assessment',function(req,res){

	var clas = req.body.class;
	var section = req.body.section;
	var subject = req.body.subject;
	var type = req.body.type;
	var total = req.body.total;
	var date = req.body.date;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT * FROM STUDENT WHERE CLASS=? AND SECTION=?';

		var students = null;
		connection.query(query, [clas,section],
			function(err,rows,fields) {

				if(err){
					console.log("Failed to fetch students data");
					res.json({"code":500});
					connection.release();
				}
				else{
					students = rows;
					query = 'SELECT ID FROM SUBJECT WHERE NAME=?';
					connection.query(query, [subject],
						function(err,rows,fields) {
							if(err){
								console.log("Failed to fetch subject id");
								res.json({"code":500});
								connection.release();
							}
							else if(rows.length==0){
								query = 'INSERT INTO SUBJECT (NAME) VALUES(?)';
								connection.query(query, [subject],
									function(err,rows,fields) {
										if(err){
											console.log("Failed to create new subject");
											res.json({"code":500});
											connection.release();
										}
										else{
											query = 'INSERT INTO ASSESSMENT (TYPE, A_DATE, SUB_ID, TOTAL_MARKS) VALUES(?,?,?,?)';
											connection.query(query, [type,date,rows.insertId,total],
												function(err,rows,fields) {
													if(err){
														console.log("Failed to create new assessment");
														res.json({"code":500});
														connection.release();
													}
													else{
														query = 'INSERT INTO MARKS (STD_ID, ASS_ID) VALUES (?,?)';
														var values = [students[0].ID,rows,insertId];
														for(var i=1; i<students.length; i++){
															query += ',(?,?)';
															values.push(students[i].ID);
															values.push(rows.insertId);
														}
														connection.query(query, [type,date,rows.insertId,total],
															function(err,rows,fields) {
																connection.release();
																if(err){
																	console.log("Failed to create new marklist");
																	res.json({"code":500});
																}
																else{
																	res.json({"code":200});
																}
															}
														);
													}
												}
											);
										}
									}
								);
							}
							else{
								query = 'INSERT INTO ASSESSMENT (TYPE, A_DATE, SUB_ID, TOTAL_MARKS) VALUES(?,?,?,?)';
								connection.query(query, [type,date,rows[0].ID,total],
									function(err,rows,fields) {
										if(err){
											console.log("Failed to create new assessment");
											res.json({"code":500});
											connection.release();
										}
										else{
											query = 'INSERT INTO MARKS (STD_ID, ASS_ID) VALUES (?,?)';
											var values = [students[0].ID,rows.insertId];
											for(var i=1; i<students.length; i++){
												query += ',(?,?)';
												values.push(students[i].ID);
												values.push(rows.insertId);
											}
											connection.query(query, values,
												function(err,rows,fields) {
													connection.release();
													if(err){
														console.log("Failed to create new marklist");
														res.json({"code":500});
													}
													else{
														res.json({"code":200});
													}
												}
											);
										}
									}
								);
							}
						}
					);
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.get('/get_assessment',function(req, res){

	var clas = req.query.class;
	var section = req.query.section;
	var subject = req.query.subject;
	var type = req.query.type;
	var date = req.query.date;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT DISTINCT ASSESSMENT.ID "ASS_ID", ASSESSMENT.TYPE, ASSESSMENT.A_DATE "DATE",'
				  + ' ASSESSMENT.TOTAL_MARKS "TM", SUBJECT.NAME "SUBJECT", STUDENT.CLASS, STUDENT.SECTION'
				  + ' FROM ASSESSMENT, SUBJECT,'
				  + ' MARKS, STUDENT WHERE STUDENT.CLASS=? AND STUDENT.SECTION=? AND STUDENT.ID'
				  + ' = MARKS.STD_ID AND MARKS.ASS_ID=ASSESSMENT.ID AND SUBJECT.NAME=? AND '
				  + ' ASSESSMENT.TYPE=? AND ASSESSMENT.A_DATE=? AND ASSESSMENT.SUB_ID=SUBJECT.ID';

		connection.query(query, [clas,section,subject,type,date],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch assessments");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});

});

app.get('/get_marksheet',function(req, res){

	var id = req.query.id;

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		var query = 'SELECT DISTINCT STUDENT.ID "STD_ID", STUDENT.NAME, MARKS.ID "M_ID", MARKS.OBTAINED "OM" FROM STUDENT,'
				  + ' MARKS WHERE MARKS.ASS_ID=? AND STUDENT.ID=MARKS.STD_ID';//AND MARKS.STD_ID=STUDENT.ID

		connection.query(query, [id],
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to fetch marksheet");
					res.json({"code":500});
				}
				else{
					res.json({"code":200, "data":rows});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});

});

app.post('/update_marksheet',function(req,res){

	var id = req.body.id;
	var list = req.body.marks;


	var query = 'REPLACE INTO MARKS (ID,STD_ID,ASS_ID,OBTAINED)'
			  + ' VALUES (?,?,?,?)';
	var values = [list[0].M_ID,list[0].STD_ID,id,list[0].OM];
	for(var i=1; i<list.length; i++){

		query += ', (?,?,?,?)';
		values.push(list[i].M_ID);
		values.push(list[i].STD_ID);
		values.push(id);
		values.push(list[i].OM);
	}

	pool.getConnection(function(err,connection){

		if (err) {
			console.log("Failed to connect to the database");
			res.json({"code":500});
		}

		connection.query(query, values,
			function(err,rows,fields) {

				connection.release();
				if(err){
					console.log("Failed to update marksheet");
					res.json({"code":500});
				}
				else{
					res.json({"code":200});
				}
			}

		);

		connection.on('error', function(err) {
			console.log("Error occurred while performing database operation");
			res.json({"code":500});
        });
	});
});

app.listen(PORT);