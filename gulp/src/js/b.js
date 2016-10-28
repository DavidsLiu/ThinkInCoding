var list = document.querySelector('.list');

list.addEventListener('click', function (e) {
  var target = e.target;
  if (target.tagName.toLowerCase() === 'li') {
    target.style.background = "red";
  }
}, false);
