let phrases;

chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
  phrases = Object.keys(result).length > 0 ? result.antiVanityPhrases : [];
});

let searchContainer = document.getElementById('global-nav-search');
let searchButton = document.getElementsByClassName('nav-search')[0];
let searchInput = document.getElementById('search-query');

let customMessageListItem = document.createElement('li');
customMessageListItem.className = 'custom';
customMessageListItem.textContent = 'Dissolve the ego, young padawan.';

let defaultBorderColor;

const applyShakeAnimation = (element) => {
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), 820);
};

const addCustomMessageListItem = () => {
  let searchDropdownList = document.getElementsByClassName('typeahead-items typeahead-accounts social-context js-typeahead-accounts block4 has-results')[0];
  if (searchDropdownList.lastChild.className === 'custom') {
    return;
  }
  searchDropdownList.appendChild(customMessageListItem);
};

const removeCustomMessageListItem = () => {
  let searchDropdownList = document.getElementsByClassName('typeahead-items typeahead-accounts social-context js-typeahead-accounts block4 has-results')[0];
  if (searchDropdownList && searchDropdownList.lastChild.className === 'custom') {
    searchDropdownList.removeChild(searchDropdownList.lastChild);
  }
};

searchButton.addEventListener('click', function(e) {
  if (phrases.includes(searchInput.value)) {
    e.stopImmediatePropagation();
    e.preventDefault();
    applyShakeAnimation(searchContainer);
  }
});

searchInput.addEventListener('keyup', function() {
  if (phrases.includes(this.value)) {
    this.classList.add('red-border');
    document.getElementsByClassName('dropdown-menu typeahead')[0].classList.add('hide');
    addCustomMessageListItem();
  } else {
    this.classList.remove('red-border');
    document.getElementsByClassName('dropdown-menu typeahead')[0].classList.remove('hide');
    removeCustomMessageListItem();
  }
});

searchInput.addEventListener('keydown', function(e) {
  if (phrases.includes(this.value) && (e.which === 13 || e.keyCode === 13)) {
    e.preventDefault();
    applyShakeAnimation(searchContainer);
  }
});