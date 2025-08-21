// var timeout = 500;
// var originalLink = window.location.href;

// function openApp(url, fallbackUrl) {
//   var iframe = document.createElement("iframe");
//   iframe.style.display = "none";
//   iframe.src = url;
//   const hihi = document.body.appendChild(iframe);

//   setTimeout(function () {
//     document.body.removeChild(iframe);
//     console.log(hihi);
//     window.location.href = fallbackUrl;
//   }, timeout);

//   // setTimeout(function () {
//   //   window.location.href = originalLink;
//   // }, timeout + 500);
// }

// function handleOpenApp() {
//   var pathAndQuery = window.location.pathname + window.location.search;
//   var userAgent = navigator.userAgent || navigator.vendor || window.opera;

//   if (/iPhone|iPad|iPod/.test(userAgent)) {
//     openApp(
//       "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1),
//       "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667"
//     );
//   } else if (/Android/.test(userAgent)) {
//     openApp(
//       "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1),
//       "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi"
//     );
//   } else {
//     window.location.href = "https://m.shop.honganh.vn/onboarding";
//   }
// }

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
console.log(12312);
// fallback to the application store on mobile devices
if (isMobile.ios() && urls.deepLink && urls.iosStoreLink) {
  console.log(12312);
  iosLaunch();
} else if (isMobile.android() && androidPackageName) {
  androidLaunch();
} else {
  window.location = urls.fallback;
}

function launchWekitApproach(url, fallback) {
  document.location = url;
  setTimeout(function () {
    document.location = fallback;
  }, 250);
}

function launchIframeApproach(url, fallback) {
  var iframe = document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "1px";
  iframe.style.height = "1px";
  iframe.onload = function () {
    document.location = url;
  };
  iframe.src = url;

  window.onload = function () {
    document.body.appendChild(iframe);

    setTimeout(function () {
      window.location = fallback;
    }, 25);
  };
}

function iosLaunch() {
  // chrome and safari on ios >= 9 don't allow the iframe approach
  if (ua.match(/CriOS/) || (ua.match(/Safari/) && ua.match(/Version\/(9|10|11|12)/))) {
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
