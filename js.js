var now = new Date().getTime();
var timeout = 1500;

function openApp(url, fallbackUrl) {
  window.location = url;
  setTimeout(function () {
    var elapsed = new Date().getTime() - now;
    if (elapsed < timeout + 100) {
      window.location = fallbackUrl;
    }
  }, timeout);
}

var pathAndQuery = window.location.pathname + window.location.search;
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/iPhone|iPad|iPod/.test(userAgent)) {
  openApp(
    "cplatform://honganh.vn" + pathAndQuery.substring(1),
    "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667"
  );
} else if (/Android/.test(userAgent)) {
  openApp(
    "intent://honganh.vn" + pathAndQuery.substring(1) + "#Intent;scheme=cplatform;package=com.frovis.seller_mobile;end",
    "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi"
  );
} else {
  window.location = "https://honganh.vn/";
}
