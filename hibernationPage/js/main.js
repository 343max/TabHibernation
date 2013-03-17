function setFavicon(faviconHref) {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = faviconHref;
  document.getElementsByTagName('head')[0].appendChild(link);
}

window.onload = function() {
  var json = decodeURIComponent(document.location.hash.substr(1, 100000));
  var pageInfo = JSON.parse(json);

  document.title = document.title + ' ' + pageInfo.title;
  setFavicon(pageInfo.favIconUrl);

  _.each(document.querySelectorAll('.pageTitle'), function(o) {
    o.innerText = pageInfo.title;
  });

  _.each(document.querySelectorAll('.pageURL'), function(o) {
    o.innerText = pageInfo.url;
  });

  var restorePage = function() {
    if (window.history.length >= 2) {
      window.history.back();
    } else {
      document.location.href = pageInfo.url;
    }
  }

  _.each(document.querySelectorAll('a.pageURLLink'), function(o) {
    o.onclick = restorePage;
  });

  document.body.onclick = restorePage;

  window.addEventListener('keyup', function(event) {
    if (event.keyIdentifier == "U+0020") {
      restorePage();
    }
  });
}
