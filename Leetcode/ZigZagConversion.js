/**
  * ZigZag Conversion
  */


/**
  * @param {string} s
  * @param {number} numRows
  * @return {string}
  * 利用map减少循环
  */
    var convert = function(s, numRows) {
        var x = 0,
            y = 0,
            dir = 'down';
            number = numRows - 1,
            map = {},
            result = '';
        //特例
        if (numRows <= 1 || s.length === 0 || numRows >= s.length) {
          return s;
        }
        for (var i = 0; i < s.length; i++) {
          if (map[y]) {
            map[y] += s.charAt(i);
          }
          else {
            map[y] = s.charAt(i);
          }
          if (y === 0) {
            y++;
            dir = 'down';
          }
          else if (y === number) {
            x++;
            y--;
            dir = "up";
          }
          else {
            if (dir === 'up') {
              x++;
              y--;
            }
            else {
              y++;
            }
          }
        }

        for (var k = 0; k < numRows; k++) {
          result += map[k];
        }
        return result;
    };
