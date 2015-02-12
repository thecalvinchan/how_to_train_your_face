var schema = require('./schema'),
    exec = require('child_process').exec,
    fs = require('fs'),
    prompt = require('prompt');

var IMAGE_CMD = process.env.OPENCV_IMAGE_CMD || 'imagesnap -q -w 2',
    IMAGE_DIR = process.env.OPENCV_IMAGE_DIR || './images/';

fs.mkdir(IMAGE_DIR, function(err) {
    if (err) {
        if (err.code == 'EEXIST') {
            // Do Nothing
        } else {
            onErr(err);
        }
    }
    new schema(function() {
        var User = this.User;
        User.count(function(err, count) {
            if (err) {
                return onErr(err);
            }
            prompt.start();
            createUser(count+1);
        });

        function createUser(id) {
            prompt.get(['name'], function (err, result) {
                if (err) {
                    return onErr(err);
                }
                console.log('Please wait while we take your picture. (Feel free to move and slightly alter your facial expressions)');
                var username = result.name.replace(/\s+/, '_');
                var image_cmd = IMAGE_CMD + ' ' + IMAGE_DIR + username + '_' + id + '_';
                var pictures = [];
                for (var i = 0; i < 10; i++) {
                    exec(image_cmd + i, (function (photo_num) { return function(err, stdout, stderr) {
                        if (err) {
                            return onErr(err);
                        } else if (stderr) {
                            return onErr(stderr);
                        }
                        pictures.push({
                            url: IMAGE_DIR + username + '_' + id + '_' + photo_num
                        });
                        if (pictures.length == 10) {
                            console.log('Success: Thanks for participating, ' + result.name + '!');
                            var user = new User({
                                id: id,
                                name: result.name,
                                pictures: pictures
                            });
                            user.save();
                            createUser();
                        } 
                    }})(i));
                }
            });
        }

        function onErr(err) {
            console.log(err);
            return 1;
        }
    });
});
