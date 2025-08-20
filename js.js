var timeout = 500;
var originalLink = window.location.href;

function openApp(url, fallbackUrl) {
  const now = Date.now();

  window.location.href = url;

  setTimeout(function () {
    window.location.href = originalLink;
  }, 1000);
}

function handleOpenApp() {
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
}
