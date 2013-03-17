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
//          hibernationUrl = 'data:text/html;charset=utf-8,' +
//            encodeURIComponent( // Escape for URL formatting
//              '<!DOCTYPE html>'+
//                '<html lang="en">'+
//                '<head><title>Embedded Window</title></head>'+
//                '<body><h1>42</h1></body>'+
//                '</html>'
//            );
          chrome.tabs.update(tab.id, {url: hibernationUrl});
        }, c * 100);
        c++;

      });
    })
  });
});
