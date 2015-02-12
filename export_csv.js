var schema = require('./schema');

new schema(function() {
    var User = this.User; 
    User.find({}, function(err, users) {
        if (err) {
            process.stderr.write(err);
        }
        for (var i=0; i<users.length; i++) {
            for (var j=0; j<users[i].pictures.length; j++) {
                process.stdout.write(users[i].pictures[j].url+';'+users[i].id+'\n');
            }
        }
        process.exit();
    });
});
