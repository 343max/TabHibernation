'use strict'

function performCommand(event) {
	if(event.command === 'hibernateTabs') {
		var c = 0

		var xmlHttp = new XMLHttpRequest()
		xmlHttp.open('GET', safari.extension.baseURI + 'hibernationPage/index.html', true)
		xmlHttp.onload = function() {
			var html = xmlHttp.responseText

			safari.application.browserWindows.forEach(function(win) {
				win.tabs.forEach(function(tab) {
					// Safari returns undefined for sites like the history page or data URIs
					if(typeof tab.url !== 'undefined') {
						if(tab === win.activeTab) return
						if(!tab.url.match(/^https?:\/\//)) return

						window.setTimeout(function() {
							var pageInfo = {
								url: tab.url,
								title: tab.title
							}

							var pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo))
							var dataURL = 'data:text/html;charset=utf-8,' + encodeURIComponent(pageHtml)
							tab.url = dataURL
						}, c * 100)

						c++
					}
				})
			})
		}
		xmlHttp.send(null)
	}
}

safari.application.addEventListener('command', performCommand(event), false)
