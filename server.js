var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var model=require('./models/model');

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/messages');
app.use('/angular', express.static(__dirname+'/bower_components/angular'));


app.get('/', function(req,res){
	console.log('got a request');
	res.sendFile(__dirname+'/views/index.html');
});


app.post('/verify', function(req, res){
	console.log(req.body);
	
	model['User'].findOne({'username':req.body['username']},function(err,result){
		console.log(result);

		if (result==''){
			console.log(result);
			res.send('failUser');
		}
		else if(result['password']!=req.body['password']){
			console.log('Password fail');
			res.send('failPassword');
		}
		else if (result['password']==req.body['password']){
			model['User'].find({'username':req.body['recipient']}, function(err, result){
				if (result=='')
				{
					res.send('failRecipient');
				}
				else{
					res.send('done');
				}

			});
			
		}
	});

	
});


app.post('/fetchMessages',function(req,res){
	console.log(req.body['username']);
	var msgs=[];
	var Message = mongoose.model(req.body['username'], model['messageSchema']);
	Message.find( {$or: [{ to: req.body['recipient']}, {to:req.body['username']}]},function(err, result){
		console.log('chuckit'+result);
		
		result.forEach(function(x){
			msgs.push({'message' : x['message'],'from' : x['from']});
		});
		res.json(msgs);
		
	});

	

});



app.post('/send',function(req, res){

	console.log(req.body);
	var msgColl = mongoose.model(req.body[0], model['messageSchema']);
	var x = new msgColl({'from':req.body[0],'to':req.body[1], 'message': req.body[2]});
	x.save();
	res.send('Done');

});



app.use('/js', express.static(__dirname+'/public/js'));

app.listen(3000,function(){
console.log('started server');
});
