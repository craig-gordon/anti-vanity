const addSiteToBlacklist = (newSite) => {
  chrome.storage.sync.get(['antiVanitySites'], (result) => {
    let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];

    chrome.storage.sync.set({'antiVanitySites': [...sites, newSite]});
  })
};

const addPhraseToBlacklist = (newPhrase) => {
  chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
    let phrases = Object.keys(result).length > 0 ? result.antiVanitySites : [];

    chrome.storage.sync.set({'antiVanityPhrases': [...phrases, newPhrase]});
  })
};

// let submitButton = document.getElementById('submit');

// submitButton.addEventListener('click', () => {
//   addSiteToBlacklist(document.getElementById('input').value);
// });

chrome.storage.sync.set({
  'antiVanitySites': [
    {
      name: 'Twitter',
      host: 'twitter.com',
      icon: '<i class="fab fa-twitter"></i>',
      active: true
    },
    {
      name: 'Google',
      host: 'google.com',
      icon: '<i class="fab fa-google"></i>',
      active: false
    },
    {
      name: 'Tumblr',
      host: 'tumblr.com',
      icon: '<i class="fab fa-tumblr"></i>',
      active: false
    }
  ],
  'antiVanityPhrases': [
    'cyghfer'
  ]
});

let sitelist = document.getElementById('sitelist');

chrome.storage.sync.get(['antiVanitySites'], (result) => {
  let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];

  sites.forEach((site) => {
    let siteListItem = document.createElement('li');
    siteListItem.className = site.active ? 'site active' : 'site inactive';
    siteListItem.innerHTML = `${site.icon}<span>${site.name}</span>`;
    sitelist.appendChild(siteListItem);
  });
});

let phraseList = document.getElementById('phraselist')

chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
  let phrases = Object.keys(result).length > 0 ? result.antiVanityPhrases : [];

  phrases.forEach((phrase) => {
    let phraseListItem = document.createElement('li');
    phraseListItem.className = 'phrase';
    phraseListItem.innerHTML = `<span></span><span>${phrase}</span><i class="fas fa-times-circle" />`;
    phraseList.appendChild(phraseListItem);
  });
});