chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('click!');
  console.dir(tab);

  var c = 0;

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