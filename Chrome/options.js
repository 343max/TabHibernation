'use strict'

function save_options() {
	var whitelist = document.getElementById('whitelist').value
	chrome.storage.sync.set({whitelist: whitelist}, function() {
		var status = document.getElementById('status')
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
document.getElementById('title').innerHTML = chrome.i18n.getMessage('optionsTitle')
document.getElementById('heading').innerHTML = chrome.i18n.getMessage('optionsHeading')
document.getElementById('firstParagraph').innerHTML = chrome.i18n.getMessage('optionsFirstParagraph')
document.getElementById('secondParagraph').innerHTML = chrome.i18n.getMessage('optionsSecondParagraph')
document.getElementById('thirdParagraph').innerHTML = chrome.i18n.getMessage('optionsThirdParagraph')
document.getElementById('firstStrong').innerHTML = chrome.i18n.getMessage('optionsFirstStrong')
document.getElementById('secondStrong').innerHTML = chrome.i18n.getMessage('optionsSecondStrong')
document.getElementById('save').innerHTML = chrome.i18n.getMessage('optionsSaveButton')
document.getElementById('save').addEventListener('click', save_options)
