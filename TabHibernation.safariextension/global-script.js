var performCommand = function(event) {
	if(event.command === 'hibernateTabs') {
		var c = 0;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', safari.extension.baseURI + 'lib/hibernationPage/index.html', true);
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === 4) {
				var html = xmlHttp.responseText;

				_.each(safari.application.browserWindows, function(win) {
					_.each(win.tabs, function(tab) {
						if(tab === win.activeTab) return;
						if(!tab.url.match(/^https?:\/\//)) return;

						_.delay(function() {
							var pageInfo = {
								url: tab.url,
								title: tab.title
							};

							var pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo));
							var dataURL = 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml);
							tab.url = dataURL;
						}, c * 100);

						c++;
					});
				});
			}
		};
		xmlHttp.send(null);
	}
};

safari.application.addEventListener('command', performCommand, false);
