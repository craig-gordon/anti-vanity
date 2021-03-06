let phraseInput = document.getElementsByClassName('phrases-input')[0];

phraseInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    let phrase = this.value;
    chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
      let phrases = result.antiVanityPhrases || [];
      if (phrases.includes(phrase)) {
        this.value = '';
        return;
      }
      let newPhrasesArr = phrases.concat(phrase);
      chrome.storage.sync.set({'antiVanityPhrases': newPhrasesArr}, () => {
        let phraseList = document.getElementById('phraselist');
        let phraseListItem = document.createElement('li');
        phraseListItem.className = phrase[0] === '/' && phrase[phrase.length - 1] === '/' ? 'phrase regex' : 'phrase literal';
        phraseListItem.innerHTML = `<span></span><span>${phrase}</span>`;
        let closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-times-circle';
        closeIcon.addEventListener('click', function() {
          chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
            let phrases = result.antiVanityPhrases || [];
            let idx;
            phrases.forEach((phrase, i) => {
              if (this.previousSibling.innerHTML === phrase) idx = i;
            });
            let newPhrasesArr = phrases.slice(0, idx).concat(phrases.slice(idx + 1));
    
            chrome.storage.sync.set({'antiVanityPhrases': newPhrasesArr}, () => {
              this.parentElement.remove();
            });
          });
        });
        phraseListItem.appendChild(closeIcon);
        phraseList.appendChild(phraseListItem);
        this.value = '';
      });
    })
  }
})

chrome.storage.sync.get(['antiVanitySites'], (result) => {
  let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];
  let siteList = document.getElementById('sitelist');

  sites.forEach((site) => {
    let siteListItem = document.createElement('li');
    siteListItem.className = site.active ? 'site active' : 'site inactive';
    siteListItem.innerHTML = `${site.icon}<span>${site.name}</span>`;
    siteListItem.addEventListener('click', function() {
      chrome.storage.sync.get(['antiVanitySites'], (result) => {
        let sites = result.antiVanitySites;
        let idx;
        sites.forEach((site, i) => {
          if (this.innerHTML.includes(site.name)) idx = i;
        });
        let newSiteObj = Object.assign(sites[idx], {'active': !sites[idx].active});
        let newSitesArr = sites.slice(0, idx).concat([newSiteObj], sites.slice(idx + 1));
        
        chrome.storage.sync.set({'antiVanitySites': newSitesArr}, () => {
          this.className = this.className === 'site active' ? 'site inactive' : 'site active';
        });
      })
    })
    siteList.appendChild(siteListItem);
  });
});

chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
  let phrases = Object.keys(result).length > 0 ? result.antiVanityPhrases : [];
  let phraseList = document.getElementById('phraselist');

  phrases.forEach((phrase) => {
    let phraseListItem = document.createElement('li');
    phraseListItem.className = phrase[0] === '/' && phrase[phrase.length - 1] === '/' ? 'phrase regex' : 'phrase literal';
    phraseListItem.innerHTML = `<span></span><span>${phrase}</span>`;
    let closeIcon = document.createElement('i');
    closeIcon.className = 'fas fa-times-circle';
    closeIcon.addEventListener('click', function() {
      chrome.storage.sync.get(['antiVanityPhrases'], (result) => {
        let phrases = result.antiVanityPhrases || [];
        let idx;
        phrases.forEach((phrase, i) => {
          if (this.previousSibling.innerHTML === phrase) idx = i;
        });
        let newPhrasesArr = phrases.slice(0, idx).concat(phrases.slice(idx + 1));

        chrome.storage.sync.set({'antiVanityPhrases': newPhrasesArr}, () => {
          this.parentElement.remove();
        });
      });
    });
    phraseListItem.appendChild(closeIcon);
    phraseList.appendChild(phraseListItem);
  });
});