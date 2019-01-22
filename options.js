const addSiteToBlacklist = (siteName) => {
  chrome.storage.sync.get(['antiVanitySites'], result => {
    console.log('result:', result);
    sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];

    chrome.storage.sync.set({'antiVanitySites': [...sites, siteName]});
  })
}

let submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  addSiteToBlacklist(document.getElementById('input').value);
});

let sitelistElem = document.getElementById('sitelist');

chrome.storage.sync.get(['antiVanitySites'], result => {
  console.log('result:', result);
  let sites = Object.keys(result).length > 0 ? result.antiVanitySites : [];

  sites.forEach(site => {
    let siteLi = document.createElement('li');
    siteLi.innerHTML = site;
    console.log('siteLi:', siteLi);
    sitelistElem.appendChild(siteLi);
  });
});