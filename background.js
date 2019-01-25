chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log('changeInfo:', changeInfo);
  if (changeInfo.status !== 'complete') return;

  window.antiVanityScriptsLoaded = window.antiVanityScriptsLoaded || {};

  chrome.tabs.get(tabId, (tab) => {
    if (window.antiVanityScriptsLoaded[tabId.toString()]) return;
    let url = tab.url;

    chrome.storage.sync.get(['antiVanitySites'], (result) => {
      let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];
      let isSiteActive = sites.filter((site) => url.includes(site.host) && site.active).length > 0;

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

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') chrome.runtime.openOptionsPage();
});