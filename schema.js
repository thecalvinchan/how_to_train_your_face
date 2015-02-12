var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    id: Number,
    name: String,
    pictures: [{url: String}]
});

var models = {
    User : mongoose.model('User', userSchema)
}

module.exports = function(callback) {
    mongoose.connect('mongodb://localhost/acm_opencv_2015')
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', callback.bind(models)); 
};
