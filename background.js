chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  console.log('changeInfo:', changeInfo);
  if (changeInfo.status !== 'complete') return;

  window.antiVanityScriptsLoaded = window.antiVanityScriptsLoaded || {};

  chrome.tabs.get(tabId, (tab) => {
    if (window.antiVanityScriptsLoaded[tabId.toString()]) return;
    let url = tab.url;

    chrome.storage.sync.get(['antiVanitySites'], (result) => {
      let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];
      let urlIncluded = sites.filter((site) => url.includes(site.host)).length > 0;

      if (urlIncluded) {
        console.log('executing scripts, url:', url);
        window.antiVanityScriptsLoaded[tabId.toString()] = true;
        chrome.tabs.insertCSS(tabId, {file: 'lockSearchInput.css'});
        chrome.tabs.executeScript(tabId, {file: 'lockSearchInput.js'}, () => {
          chrome.tabs.sendMessage(tabId, {url});
        });
      }
    });
  });
});