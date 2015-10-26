var request = require("request");

var options = {
    url: 'http://smartlync.pk/api',
    method: 'GET',
    qs: {
    	transaction_id: "XG3434f0a5b93b6",
    	to: "03324554565",
    	text: "Invalid key",
    	api_key: "23a03108ea4a7965f672e25b6b68ebbb",
    	api_secret: "90397d831"
    }
};

var callback = function(error, response, body) {
	if(error)
		console.log("Sending failed! Please check your internet connection");
	else
		console.log(body);
}

request(options,callback);