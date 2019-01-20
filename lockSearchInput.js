let searchButton = document.getElementsByClassName('nav-search')[0];
let searchInput = document.getElementById('search-query');
let defaultBorderColor;

searchButton.addEventListener('click', function(e) {
  console.log('form e:', e);
  if (searchInput.value === 'cyghfer') {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
})

searchInput.addEventListener('keyup', function() {
  defaultBorderColor === undefined ? defaultBorderColor = this.style.borderColor : null;
  if (this.value === 'cyghfer') {
    this.style.borderColor = 'red';
  } else {
    this.style.borderColor = defaultBorderColor;
  }
});

searchInput.addEventListener('keydown', function(e) {
  console.log('e:', e);
  if (e.which === 13 || e.keyCode === 13) {
    e.preventDefault();
  }
});