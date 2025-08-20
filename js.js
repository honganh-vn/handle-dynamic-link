function handleOpenApp() {
  var pathAndQuery = window.location.pathname + window.location.search;
  var schemeUrl = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);

  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var fallbackTimer;

  function openApp(scheme, fallbackUrl) {
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") {
        clearTimeout(fallbackTimer);
      }
    });

    window.location = scheme;

    fallbackTimer = setTimeout(function () {
      window.location.href = fallbackUrl;
    }, 1200); // chỉ fallback nếu app KHÔNG mở
  }

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    openApp(schemeUrl, "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%C3%B4ng-anh/id6470966667");
  } else if (/Android/.test(userAgent)) {
    openApp(schemeUrl, "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi");
  } else {
    window.location.href = "https://m.shop.honganh.vn/onboarding";
  }
}
