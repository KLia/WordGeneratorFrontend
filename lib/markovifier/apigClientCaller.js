
var apiGateway = apiGateway || {};
var resultData = 'ASDF';

var apigClient = apigClientFactory.newClient();

var apigClient = apigClientFactory.newClient({
  apiKey: "7cnMozaWn47knLvnmpFKyaXHc49OUs1d3A68gniW"
});

apiGateway.getWords = function(corpus, noOfWords, state_size, min_word_len, remove_duplicates, callback, element) 
{
	var params = [];

	var body = { 
		corpus: corpus, 
		noOfWords: noOfWords, 
		state_size: state_size, 
		min_word_len: min_word_len,
		remove_duplicates: remove_duplicates
	};
	
	var additionalParams = [];
	
	apigClient.wordsPost(params, body, additionalParams)
		.then(function(result){
			return callback(element, result.data);
		}).catch( function(result){
		});
}

apiGateway.sendEmail = function(subject, body, replyToAddress, name, callback)
{
	var params = [];

	var body = {
		subject: subject,
		body: body,
		replyToAddress: replyToAddress,
		name: name
	};

	var additionalParams = []

	apigClient.emailPost(params, body, additionalParams)
	.then(function(result){
		callback(true);
	}).catch(function (result) {
		callback(false);
	});
}