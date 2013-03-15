chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('click!');
  console.dir(tab);

  chrome.windows.getAll({ populate: true}, function(windows) {
    console.dir(windows);
  });
});