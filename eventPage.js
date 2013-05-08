chrome.browserAction.onClicked.addListener(function(tab) {
  var c = 0;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', chrome.extension.getURL('hibernationPage/index.html'), true);
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4) {
      var html = xmlHttp.responseText;

      chrome.windows.getAll({ populate: true}, function(windows) {
        _.each(windows, function(win) {
          _.each(win.tabs, function(tab) {
            if (tab.active) return;
            if (tab.status != 'complete') return;
            if (!tab.url.match(/^https?:\/\//)) return;
            console.dir(tab);

            window.setTimeout(function() {

              var pageInfo = {
                url: tab.url,
                title: tab.title,
                favIconUrl: tab.favIconUrl
              };

              var pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo));
              var dataURL = 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml);
              chrome.tabs.update(tab.id, {url: dataURL});
            }, c * 100);
            c++;

          });
        })
      });
    }
  };
  xmlHttp.send(null);
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    //
    var m = tab.url.match(/083E5AA1-74B0-484B-B51B-3C05CA0B24B7\*%2F(.*)%2F\*0D03FAB9-3C59-4B06-983B-7BD92619F1E6/m);
    if (!m) return;

    var pageInfo = JSON.parse(decodeURIComponent(m[1]));
    if (!pageInfo) return;
    console.dir(pageInfo);
    console.dir(tab);

    chrome.tabs.executeScript(activeInfo.tabId, {
      'code': 'window.history.back();'
    });
  });
});