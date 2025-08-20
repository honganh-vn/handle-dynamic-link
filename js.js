var timeout = 500;
var originalLink = window.location.href;

function openApp(url, fallbackUrl) {
  let appOpened = false;

  // Chrome/Android: detect focus loss
  const blurHandler = () => {
    appOpened = true;
  };
  window.addEventListener("blur", blurHandler);

  // Thử mở app
  window.location = url;

  // Nếu app không mở sau 1.5s → fallback
  setTimeout(() => {
    if (!appOpened) {
      window.location = fallbackUrl;
    }
  }, 1500);

  // Reset trang sau 2.5s (chỉ nếu app chưa mở)
  setTimeout(() => {
    if (!appOpened) {
      window.location = originalLink;
    }
  }, 2500);
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
