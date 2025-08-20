var timeout = 500;
var originalLink = window.location.href;

// function openApp(url, fallbackUrl) {
//   var iframe = document.createElement("iframe");
//   iframe.style.display = "none";
//   iframe.src = url;
//   document.body.appendChild(iframe);

//   setTimeout(function () {
//     document.body.removeChild(iframe);

//     window.location.href = fallbackUrl;
//   }, timeout);

//   setTimeout(function () {
//     window.location.href = originalLink;
//   }, timeout + 500);
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

function handleOpenApp() {
  var pathAndQuery = window.location.pathname + window.location.search;
  var schemeUrl = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);

  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    // Safari chỉ chấp nhận gán trực tiếp
    window.location = schemeUrl;

    // fallback sau 1s nếu không mở được
    setTimeout(function () {
      window.location.href = "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667";
    }, 1000);
  } else if (/Android/.test(userAgent)) {
    window.location = schemeUrl;
    setTimeout(function () {
      window.location.href = "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";
    }, 1000);
  } else {
    window.location.href = "https://m.shop.honganh.vn/onboarding";
  }
}
