const $ = require('./jquery.js');
$('#demo').css('color','yellow');
require.ensure(['./share.js'], function (require) {
  const share = require('./share.js');
  share('page two');
});
