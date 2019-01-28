chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      'antiVanitySites': [
        {
          name: 'Google',
          host: 'google.com',
          icon: '<i class="fab fa-google"></i>',
          active: true
        },
        {
          name: 'Twitter',
          host: 'twitter.com',
          icon: '<i class="fab fa-twitter"></i>',
          active: true
        },
        {
          name: 'Reddit',
          host: 'reddit.com',
          icon: '<i class="fab fa-reddit-alien"></i>',
          active: true
        },
        {
          name: 'Tumblr',
          host: 'tumblr.com',
          icon: '<i class="fab fa-tumblr"></i>',
          active: true
        }
      ]
    }, () => {
      chrome.runtime.openOptionsPage();
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;

  window.antiVanityScriptsLoaded = window.antiVanityScriptsLoaded || {};

  chrome.tabs.get(tabId, (tab) => {
    if (window.antiVanityScriptsLoaded[tabId.toString()]) return;
    let url = tab.url;

    chrome.storage.sync.get(['antiVanitySites'], (result) => {
      let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];
      let isSiteActive = sites.some((site) => url.includes(site.host) && site.active);

      if (isSiteActive) {
        window.antiVanityScriptsLoaded[tabId.toString()] = true;
        chrome.tabs.insertCSS(tabId, {file: 'lockSearchInput.css'});
        chrome.tabs.executeScript(tabId, {file: 'lockSearchInput.js'}, () => {
          chrome.tabs.sendMessage(tabId, {url});
        });
      }
    });
  });
});