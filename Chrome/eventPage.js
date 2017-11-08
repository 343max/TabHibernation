'use strict'

let whitelist
let whitelistArray = new Array()

chrome.storage.sync.get(function(items) {
	if (items.whitelist) {
		whitelist = items.whitelist
		whitelistArray = whitelist.split('\n')
	}
})

function inWhitelist(url) {
	let listed = false
	whitelistArray.forEach(function(item) {
		if (url.startsWith(item)) {
			listed = true
		}
	})
	return listed
}

function sleepTab(html, tab) {
	const pageInfo = {
		url: tab.url,
		title: tab.title,
		hibernationInfo: chrome.i18n.getMessage('hibernationPageInfo'),
		buttonText: chrome.i18n.getMessage('hibernationPageButton'),
		favIconUrl: tab.favIconUrl
	}
	const pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo))
	const dataURL = 'data:text/html;base64,' + btoa(pageHtml)
	chrome.tabs.update(tab.id, {url: dataURL, autoDiscardable: true})
}

chrome.browserAction.onClicked.addListener(function() {
	const xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', chrome.runtime.getURL('hibernationPage/index.html'), true)
	xmlHttp.onload = function() {
		const html = xmlHttp.responseText

		chrome.windows.getAll({populate: true}, function(windows) {
			windows.forEach(function(win) {
				win.tabs.forEach(function(tab) {
					if (tab.active || tab.highlighted || tab.pinned) return
					if (tab.status !== 'complete') return
					if (!tab.url.match(/^https?:\/\//)) return
					if (inWhitelist(tab.url)) return

					sleepTab(html, tab)
				})
			})
		})
	}
	xmlHttp.send(null)
})

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		id : 'SleepTab',
		title : chrome.i18n.getMessage('contextMenuTitle'),
		contexts : ['page']
	})
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	const xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', chrome.runtime.getURL('hibernationPage/index.html'), true)
	xmlHttp.onload = function() {
		const html = xmlHttp.responseText
		sleepTab(html, tab)
	}
	xmlHttp.send(null)
})

chrome.commands.onCommand.addListener(function() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		const xmlHttp = new XMLHttpRequest()
		xmlHttp.open('GET', chrome.runtime.getURL('hibernationPage/index.html'), true)
		xmlHttp.onload = function() {
			const html = xmlHttp.responseText
			sleepTab(html, tabs[0])
		}
		xmlHttp.send(null)
	})
})
