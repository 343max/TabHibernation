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
  console.dir(pageInfo);

  document.title = pageInfo.title;
  setFavicon(pageInfo.favIconUrl);
}
