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
