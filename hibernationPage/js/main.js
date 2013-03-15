window.onload = function() {
  var json = decodeURIComponent(document.location.hash.substr(1, 100000));
  var pageInfo = JSON.parse(json);
  console.dir(pageInfo);

  document.title = pageInfo.title;
}
