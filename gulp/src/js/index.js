function add(num1, num2) {
  return num1 + num2;
}

var num1 = 20, num2 = 10;
var result = add(num1, num2);

var h = document.querySelector('h2');
h.innerHTML = result + '';
