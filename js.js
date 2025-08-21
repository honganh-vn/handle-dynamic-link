var fallback = "https://m.shop.honganh.vn/onboarding";
var pathAndQuery = window.location.pathname + window.location.search;
var url = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);
var androidPackageName = "com.honganh.sellermobile";
var iosStoreLink = "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667";
var playStoreLink = "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";
var ua = window.navigator.userAgent;

// split the first :// from the url string
var split = url.split(/:\/\/(.+)/);
var scheme = split[0];
var path = split[1] || "";
console.log(ua);
var urls = {
  deepLink: url,
  iosStoreLink: iosStoreLink,
  android_intent: "intent://" + path + "#Intent;scheme=" + scheme + ";package=" + androidPackageName + ";end;",
  playStoreLink: playStoreLink,
  fallback: fallback,
};

var isMobile = {
  android: function () {
    return /Android/i.test(ua);
  },
  ios: function () {
    return /iPhone|iPad|iPod/i.test(ua);
  },
};

function launchWekitApproach(url, fallback) {
  let now = Date.now();

  window.location = url;

  setTimeout(function () {
    if (Date.now() - now < 2000) {
      window.location = fallback;
    }
  }, 1500);
}

function launchIframeApproach(url, fallback) {
  var iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = url;
  document.body.appendChild(iframe);

  var hidden = false;

  // Nếu app mở được thì tab sẽ mất focus hoặc ẩn đi
  function onHide() {
    hidden = true;
  }

  window.addEventListener("blur", onHide);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      hidden = true;
    }
  });

  // Sau timeout, nếu không mở được app thì fallback
  setTimeout(function () {
    if (!hidden) {
      window.location = fallback;
    }
    // dọn event listener
    window.removeEventListener("blur", onHide);
  }, 1500);
}

function iosLaunch() {
  // chrome and safari on ios >= 9 don't allow the iframe approach
  if (ua.match(/CriOS/) || ua.match(/Safari/)) {
    launchWekitApproach(urls.deepLink, urls.iosStoreLink || urls.fallback);
  } else {
    launchIframeApproach(urls.deepLink, urls.iosStoreLink || urls.fallback);
  }
}

function androidLaunch() {
  if (ua.match(/Chrome/)) {
    document.location = urls.android_intent;
  } else if (ua.match(/Firefox/)) {
    launchWekitApproach(urls.deepLink, urls.playStoreLink || urls.fallback);
  } else {
    launchIframeApproach(url, urls.playStoreLink || urls.fallback);
  }
}

const handleOpenApp = () => {
  if (isMobile.ios()) {
    iosLaunch();
  } else if (isMobile.android()) {
    androidLaunch();
  } else {
    window.location = urls.fallback;
  }
};
