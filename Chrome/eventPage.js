'use strict'

let whitelistArray = new Array()
let caffeinatedAudio = false

chrome.storage.sync.get(function(items) {
	if (items.whitelist) whitelistArray = items.whitelist.split('\n')
	if (items.audible !== undefined) caffeinatedAudio = items.audible
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

		chrome.tabs.query({
			active: false,
			pinned: false,
			highlighted: false,
			status: 'complete',
			url: ['http://*/*', 'https://*/*', 'ftp://*/*', 'file://*/*']
		}, function(tabs) {
			tabs.forEach(function(tab) {
				if (inWhitelist(tab.url)) return
				if (tab.audible && caffeinatedAudio) return
				sleepTab(html, tab)
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
