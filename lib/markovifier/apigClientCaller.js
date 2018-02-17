
var apiGateway = apiGateway || {};
var resultData = 'ASDF';

apiGateway.getWords = function(corpus, noOfWords, state_size, min_word_len, callback, element) 
{
	var apigClient = apigClientFactory.newClient();

	var apigClient = apigClientFactory.newClient({
	  apiKey: "7cnMozaWn47knLvnmpFKyaXHc49OUs1d3A68gniW"
	});

	var params = [];

	var body = { 
		corpus: corpus, 
		noOfWords: noOfWords, 
		state_size: state_size, 
		min_word_len: min_word_len 
	};
	
	var additionalParams = [];
	
	apigClient.wordsPost(params, body, additionalParams)
		.then(function(result){
			return callback(element, result.data);
		}).catch( function(result){
		});
}