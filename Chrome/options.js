'use strict'

function save_options() {
	const whitelist = document.getElementById('whitelist').value
	const audible = document.getElementById('audible').checked
	const thumbnails = document.getElementById('thumbnails').checked

	chrome.storage.sync.set({whitelist: whitelist, audible: audible, thumbnails: thumbnails}, function() {
		const status = document.getElementById('status')
		status.textContent = chrome.i18n.getMessage('saveOptions')
		setTimeout(function() {
			status.textContent = ''
		}, 750)
	})
}

function restore_options() {
	chrome.storage.sync.get(function(items) {
		document.getElementById('whitelist').value = items.whitelist
		document.getElementById('audible').checked = items.audible
		document.getElementById('thumbnails').checked = items.thumbnails
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
document.getElementById('audibleSpan').innerText = chrome.i18n.getMessage('optionsAudible')
document.getElementById('thumbnailsSpan').innerText = chrome.i18n.getMessage('optionsThumbnails')
document.getElementById('save').innerText = chrome.i18n.getMessage('optionsSaveButton')
document.getElementById('save').addEventListener('click', save_options)
