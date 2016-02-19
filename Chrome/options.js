function save_options() {
  var whitelist = document.getElementById('whitelist').value;
  chrome.storage.sync.set({whitelist: whitelist}, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({whitelist: ""}, function(items) {
    document.getElementById('whitelist').value = items.whitelist;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
