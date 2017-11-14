'use strict'

let whitelistArray = new Array()
let caffeinatedAudio = false
let thumbnails = false

chrome.storage.sync.get(function(items) {
	if (items.whitelist) whitelistArray = items.whitelist.split('\n')
	if (items.audible !== undefined) caffeinatedAudio = items.audible
	if (items.thumbnails !== undefined) thumbnails = items.thumbnails
})

chrome.storage.onChanged.addListener(function(changes, area) {
	if (area === 'sync') {
		chrome.storage.sync.get(function(items) {
			if (items.whitelist) whitelistArray = items.whitelist.split('\n')
			if (items.audible !== undefined) caffeinatedAudio = items.audible
			if (items.thumbnails !== undefined) thumbnails = items.thumbnails
		})
	}
})

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({
		id : 'SleepTab',
		title : chrome.i18n.getMessage('contextMenuTitle'),
		contexts : ['page']
	})
})

function inWhitelist(url) {
	whitelistArray.forEach(function(item) {
		if (url.startsWith(item)) {
			return true
		}
	})
	return false
}

function sleepTab(html, tab, img) {
	const pageInfo = {
		url: tab.url,
		title: tab.title,
		hibernationInfo: chrome.i18n.getMessage('hibernationPageInfo'),
		buttonText: chrome.i18n.getMessage('hibernationPageButton'),
		favIconUrl: tab.favIconUrl
	}

	const pageHtml = html.replace(/\{\/\*pageInfoObject\*\/\}/, JSON.stringify(pageInfo))

	if (img && thumbnails) {
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		const i = new Image()
		i.src = img
		i.onload = function() {
			canvas.width = 300
			canvas.height = canvas.width * (i.height / i.width)
			ctx.drawImage(i, 0, 0, canvas.width, canvas.height)
			img = canvas.toDataURL('image/webp')

			const dataURL = 'data:text/html;charset=UTF-8,' + encodeURIComponent(pageHtml.replace(/__WEBP__/, img))
			chrome.tabs.update(tab.id, {url: dataURL, autoDiscardable: true})
		}
		return
	}
	const dataURL = 'data:text/html;charset=UTF-8,' + encodeURIComponent(pageHtml.replace(/__WEBP__/, 'data:'))
	chrome.tabs.update(tab.id, {url: dataURL, autoDiscardable: true})
}

function sleepSingle(tab) {
	const xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', chrome.runtime.getURL('hibernationPage/index.html'), true)
	xmlHttp.onload = function() {
		chrome.tabs.captureVisibleTab({format: 'png'}, function(img) {
			sleepTab(xmlHttp.responseText, tab, img)
		})
	}
	xmlHttp.send(null)
}

chrome.browserAction.onClicked.addListener(function() {
	const xmlHttp = new XMLHttpRequest()
	xmlHttp.open('GET', chrome.runtime.getURL('hibernationPage/index.html'), true)
	xmlHttp.onload = function() {
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
				sleepTab(xmlHttp.responseText, tab)
			})
		})
	}
	xmlHttp.send(null)
})

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	sleepSingle(tab)
})

chrome.commands.onCommand.addListener(function() {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
		sleepSingle(tabs[0])
	})
})
