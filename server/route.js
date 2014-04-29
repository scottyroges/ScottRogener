var express = require('express');
var http = require('http');
var nodemailer = require("nodemailer");

module.exports = function(app){
	app.get('/service/headlines', function(req,res){
		http.get('http://www.reddit.com/.rss', function(resp){
			var str = '';

			resp.on('data', function(chunk){
				str += chunk;
			});
			resp.on('end', function(){
				res.send(str);
			});
		}).on("error", function(e){
			console.log("Got error: " + e.message);
		});
	});

	app.post('/service/contactme', function(req, res) {
		var name = req.body.name;
		var message = req.body.message;
		console.log("New Message from " + name + " : " + message);
		var smtpTransport = nodemailer.createTransport("SMTP",{
			service: "Gmail",
			auth: {
				user: "srogener@gmail.com",
				pass: "pskbjj1990"
			}
		});

		var mailOptions = {
		    from: "contactme@scottrogener.com", // sender address
		    to: "srogener@gmail.com", // list of receivers
		    subject: "New Message From " + name + "!", // Subject line
		    text: "From : " + name + "\n" + "Message : " + message, // plaintext body
		}

		smtpTransport.sendMail(mailOptions, function(error, response){
			if(error){
				console.log(error);
			}else{
				console.log("Message sent: " + response.message);
			}

    		// if you don't want to use this transport object anymore, uncomment following line
    		smtpTransport.close(); // shut down the connection pool, no more messages
		});
		res.send("Thanks for the message " + name + "!");
	});

	app.get('/', function(req,res){
		res.sendfile('./app/index.html');
	});

	app.get('/RedditHeadlines', function(req,res){
		res.sendfile('./RedditHeadlines/app/index.html');
	})

	app.get('/41Thieves', function(req, res){
		res.sendfile('./41Thieves/index.html');
	});
}