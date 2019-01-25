const layouts = {
  'Twitter': {
    'container': {
      method: 'getElementById',
      str: 'global-nav-search',
      isArr: false
    },
    'button': {
      method: 'getElementsByClassName',
      str: 'nav-search',
      isArr: true
    },
    'input': {
      method: 'getElementById',
      str: 'search-query',
      isArr: false
    },
    'getsRedBorder': {
      method: 'getElementById',
      str: 'search-query',
      isArr: false
    },
    'ddContainer': {
      method: 'getElementsByClassName',
      str: 'dropdown-menu typeahead',
      isArr: true
    },
    'ddList': {
      method: 'getElementsByClassName',
      str: 'typeahead-items typeahead-accounts social-context js-typeahead-accounts block4 has-results',
      isArr: true
    }
  },
  'Google': {
    'container': {
      method: 'getElementsByClassName',
      str: 'RNNXgb',
      isArr: true
    },
    'button': {
      method: 'getElementsByName',
      str: 'btnK',
      isArr: true
    },
    'input': {
      method: 'getElementsByName',
      str: 'q',
      isArr: true
    },
    'getsRedBorder': {
      method: 'getElementsByClassName',
      str: 'RNNXgb',
      isArr: true
    },
    'ddContainer': {
      method: 'getElementsByClassName',
      str: 'UUbT9',
      isArr: true
    },
    'ddList': {
      method: 'getElementsByClassName',
      str: 'aajZCb',
      isArr: true
    }
  },
  'Reddit': {
    'container': {
      method: 'getElementById',
      str: 'SearchDropdown',
      isArr: false
    },
    'button': null,
    'input': {
      method: 'getElementsByName',
      str: 'q',
      isArr: true
    },
    'getsRedBorder': {
      method: 'getElementById',
      str: 'header-search-bar',
      isArr: false
    },
    'ddContainer': {
      method: 'getElementsByClassName',
      str: 'TMMvbwyeh9yuHKmQWHrE3 heh8xf-0 joLCja s1afd82k-0 gOGIEl',
      isArr: true
    },
    'ddList': {
      method: 'getElementsByClassName',
      str: 'TMMvbwyeh9yuHKmQWHrE3 heh8xf-0 joLCja s1afd82k-0 gOGIEl',
      isArr: true
    }
  },
  'Tumblr': {
    'container': {
      method: 'getElementById',
      str: 'search_field',
      isArr: false
    },
    'button': null,
    'input': {
      method: 'getElementById',
      str: 'search_query',
      isArr: false
    },
    'getsRedBorder': {
      method: 'getElementById',
      str: 'search_query',
      isArr: false
    },
    'ddContainer': {
      method: 'getElementById',
      str: 'popover_search',
      isArr: false
    },
    'ddList': {
      method: 'getElementsByClassName',
      str: 'tag search_results_section',
      isArr: true
    }
  }
};

const getElement = (site, type) => {
  if (!layouts[site][type]) return null;
  let idx = 0;
  if (site === 'Google' && type === 'button') idx = 1; 
  return layouts[site][type].isArr
    ? document[layouts[site][type].method](layouts[site][type].str)[idx]
    : document[layouts[site][type].method](layouts[site][type].str);
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message:', message);
  let url = message.url;

  chrome.storage.sync.get(['antiVanitySites', 'antiVanityPhrases'], (result) => {
    let site = result.antiVanitySites.filter((site) => url.includes(site.host))[0].name;
    console.log('site:', site);
    let phrases = result.antiVanityPhrases;

    let container = getElement(site, 'container');
    let button = getElement(site, 'button');
    let input = getElement(site, 'input');
  
    let customMessageListItem = document.createElement('li');
    customMessageListItem.className = 'custom';
    customMessageListItem.textContent = 'Dissolve the ego, young padawan.';
    

    // METHODS
  
    const applyShakeAnimation = (element) => {
      element.classList.add('shake');
      setTimeout(() => element.classList.remove('shake'), 820);
    };
  
    const addCustomMessageListItem = () => {
      let dropdown = getElement(site, 'ddList');
      if (dropdown.lastChild.className === 'custom') {
        return;
      }
      dropdown.appendChild(customMessageListItem);
    };
  
    const removeCustomMessageListItem = () => {
      let dropdown = getElement(site, 'ddList');
      if (dropdown && dropdown.lastChild.className === 'custom') {
        dropdown.removeChild(dropdown.lastChild);
      }
    };


    // EVENT LISTENERS
  
    if (button) {
      button.addEventListener('click', function(e) {
        if (phrases.includes(input.value)) {
          e.stopImmediatePropagation();
          e.preventDefault();
          applyShakeAnimation(container);
        }
      });
    }
  
    input.addEventListener('keyup', function() {
      console.log('input keyup this.value:', this.value);
      if (phrases.includes(this.value)) {
        getElement(site, 'getsRedBorder').classList.add('red-border');
        getElement(site, 'ddContainer').classList.add('hide');
        addCustomMessageListItem();
      } else {
        getElement(site, 'getsRedBorder').classList.remove('red-border');
        getElement(site, 'ddContainer').classList.remove('hide');
        removeCustomMessageListItem();
      }
    });
  
    input.addEventListener('keydown', function(e) {
      if (phrases.includes(this.value) && e.key === 'Enter') {
        e.stopImmediatePropagation();
        e.preventDefault();
        applyShakeAnimation(container);
      }
    });
  });
});