const $ = require('./jquery.js');
$('#demo').css('color','red');
require(['./share.js'], function (share) {
  share('page one');
});
