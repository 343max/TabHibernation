Array.prototype.each = function(callback) {
  for(var i = 0; i < this.length; i++) {
    callback(this[i]);
  }
};

NodeList.prototype.each = Array.prototype.each;

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

  document.querySelectorAll('.pageTitle').each(function(o) {
    o.innerText = pageInfo.title;
  });

  document.querySelectorAll('.pageURL').each(function(o) {
    o.innerText = pageInfo.url;
  });

  var restorePage = function() {
    if (window.history.length >= 2) {
      window.history.back();
    } else {
      document.location.href = pageInfo.url;
    }
  }

  document.querySelectorAll('a.pageURLLink').each(function(o) {
    o.onclick = restorePage;
  });

  document.body.onclick = restorePage;

  window.addEventListener('keyup', function(event) {
    if (event.keyIdentifier == "U+0020") {
      restorePage();
    }
  });
}
