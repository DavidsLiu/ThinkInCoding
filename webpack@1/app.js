/**
 * one
 */
// const a = require('./js/a.js');
// a.say();
//
// //这里的ensure函数的第一个参数 依赖项只会被下载下来并不会被执行。
// require.ensure(['./js/b.js'], function (require) {
//   const b = require('./js/b.js');
//   b.say();
// });

/**
 * two
 */

require('bundle!./js/b.js', function (info) {
  info.say();
});
