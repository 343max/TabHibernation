chrome.browserAction.onClicked.addListener(function(tab) {
  var c = 0;

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', chrome.extension.getURL('lib/hibernationPage/index.html'), true);
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4) {
      var html = xmlHttp.responseText;

      chrome.windows.getAll({ populate: true}, function(windows) {
        _.each(windows, function(win) {
          _.each(win.tabs, function(tab) {
			if (tab.active) return;
			if (tab.status != 'complete') return;
			if (!tab.url.match(/^https?:\/\//)) return;
            sleepTab(html, tab, c * 100);
            c++;
          });
        })
      });
    }
  };
  xmlHttp.send(null);
});
function sleepTab(html, tab, timeout) {
	window.setTimeout(function() {
	  var pageInfo = {
		url: tab.url,
		title: tab.title,
		favIconUrl: tab.favIconUrl
	  };
	  var pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo));
	  var dataURL = 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml);
	  chrome.tabs.update(tab.id, {url: dataURL});
	}, timeout);
}
chrome.contextMenus.create({
	id : "SleepTab" ,
	title : "Hibernate This Page" ,
	contexts : ["page"]
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', chrome.extension.getURL('lib/hibernationPage/index.html'), true);
  xmlHttp.onreadystatechange = function () {
	if (xmlHttp.readyState == 4) {
	  var html = xmlHttp.responseText;
	  sleepTab(html, tab, 100);
	}
  };
  xmlHttp.send(null);
});
