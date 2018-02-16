
var apiGateway = apiGateway || {};
var resultData = 'ASDF';

apiGateway.getWords = function(element, corpus, noOfWords, state_size, min_word_len) 
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
			apiGateway.BuildWordsTable(element, result.data);
		}).catch( function(result){
			resultData = "failure";
		});
}

apiGateway.BuildWordsTable = function buildWordsTable(element, data) {
	document.getElementById(element).innerHTML = buildWordsTableInnerHtml(JSON.parse(data));
}

function buildWordsTableInnerHtml(data) {
	var table = '<table>';
	
	table += '<tr>';
	for (var i = 0; i < data.length; i++) {
		
		if (i % 5 == 0) {
			table += '</tr><tr>';
		}
		
		table += '<td>' + data[i] + '</td>';
	}
	table += '</tr></table>';
	return table;
}