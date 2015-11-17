require('dotenv').load();
var twitter = require('simple-twitter');
twitter = new twitter(
    process.env.CONSUMER_KEY,
    process.env.CONSUMER_SECRET,
    process.env.API_KEY,
    process.env.API_SECRET
);
var request = require('request');
var badwords = require('badwords-list');
var alex = require('alex');

var randomWord = 'http://randomword.setgetgo.com/get.php';
setInterval(function(){
request.get(randomWord, function(err, res, body){
		if(err)	 throw err;
		if(badwords.regex.exec(body)){
		  console.log("A bad word!");
		} else {
		  if (alex.text(body).messages[0]) {
		    console.log("An insensitive word!");
		  } else {
		    twitter.post('statuses/update', {status: `${body} is an antipattern`});  
		  }
		}
})
}, 18000000);
