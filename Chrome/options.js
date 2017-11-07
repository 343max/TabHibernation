'use strict'

function save_options() {
	const whitelist = document.getElementById('whitelist').value
	chrome.storage.sync.set({whitelist: whitelist}, function() {
		const status = document.getElementById('status')
		status.textContent = chrome.i18n.getMessage('saveOptions')
		setTimeout(function() {
			status.textContent = ''
		}, 750)
	})
}

function restore_options() {
	chrome.storage.sync.get({whitelist: ''}, function(items) {
		document.getElementById('whitelist').value = items.whitelist
	})
}

document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('title').innerText = chrome.i18n.getMessage('optionsTitle')
document.getElementById('heading').innerText = chrome.i18n.getMessage('optionsHeading')
document.getElementById('firstParagraph').innerText = chrome.i18n.getMessage('optionsFirstParagraph')
document.getElementById('secondParagraph').innerText = chrome.i18n.getMessage('optionsSecondParagraph')
document.getElementById('thirdParagraph').innerText = chrome.i18n.getMessage('optionsThirdParagraph')
document.getElementById('firstStrong').innerText = chrome.i18n.getMessage('optionsFirstStrong')
document.getElementById('secondStrong').innerText = chrome.i18n.getMessage('optionsSecondStrong')
document.getElementById('save').innerText = chrome.i18n.getMessage('optionsSaveButton')
document.getElementById('save').addEventListener('click', save_options)
