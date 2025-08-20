var timeout = 1500;

function openApp(url, fallbackUrl) {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);

  setTimeout(function () {
    document.body.removeChild(iframe);
    window.location.href = fallbackUrl;
  }, timeout);
}

var pathAndQuery = window.location.pathname + window.location.search;
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

if (/iPhone|iPad|iPod/.test(userAgent)) {
  openApp(
    "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1),
    "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667"
  );
} else if (/Android/.test(userAgent)) {
  openApp(
    "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1),
    "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi"
  );
} else {
  window.location.href = "https://m.shop.honganh.vn/onboarding";
}
