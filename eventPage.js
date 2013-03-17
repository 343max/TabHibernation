chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('click!');
  console.dir(tab);

  var c = 0;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', chrome.extension.getURL('hibernationPage/index.html'), true);
  xmlHttp.onreadystatechange = function () {
    console.dir(xmlHttp);
    if (xmlHttp.readyState == 4) {
//      alert(xmlHttp.responseText);
    }
  };
  xmlHttp.send(null);

  chrome.windows.getAll({ populate: true}, function(windows) {
    _.each(windows, function(win) {
      _.each(win.tabs, function(tab) {
        if (tab.active) return;
        if (tab.status != 'complete') return;
        if (!tab.url.match(/^https?:\/\//)) return;

        window.setTimeout(function() {

          var pageInfo = {
            url: tab.url,
            title: tab.title,
            favIconUrl: tab.favIconUrl
          };

          var hibernationUrl = chrome.extension.getURL('hibernationPage/index.html');
          hibernationUrl += '#' + encodeURIComponent(JSON.stringify(pageInfo));
          console.log(hibernationUrl);
          chrome.tabs.update(tab.id, {url: hibernationUrl});
        }, c * 100);
        c++;

      });
    })
  });
});
