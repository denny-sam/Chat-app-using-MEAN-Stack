var mongoose = require('mongoose');


var messageSchema = mongoose.Schema({
	to: String,
	from:String,
	message: String
	//time: Date
});

var User = mongoose.model('usercol', {
	username:String,
	password:String
});

var Message = mongoose.model('msgcol', messageSchema);




module.exports=
{
	messageSchema : messageSchema,
    User : User
}