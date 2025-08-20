var timeout = 500;
var originalLink = window.location.href;

function handleOpenApp() {
  var pathAndQuery = window.location.pathname + window.location.search;
  var schemeUrl = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Đặt cờ đánh dấu đã cố gắng mở app
  localStorage.setItem("hasAttemptedOpenApp", "true");

  if (/iPhone|iPad|iPod/.test(userAgent)) {
    window.location = schemeUrl;

    // Chỉ chuyển hướng đến App Store nếu chưa mở được app
    if (!localStorage.getItem("isAppOpened")) {
      setTimeout(function () {
        window.location.href = "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667";
      }, 1000);
    }
  } else if (/Android/.test(userAgent)) {
    window.location = schemeUrl;

    if (!localStorage.getItem("isAppOpened")) {
      setTimeout(function () {
        window.location.href = "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";
      }, 1000);
    }
  } else {
    window.location.href = "https://m.shop.honganh.vn/onboarding";
  }
}

// Khi app mở, bạn có thể gửi lại một tín hiệu đến trình duyệt để cập nhật localStorage
// Ví dụ: cplatform://shop.honganh.vn?isAppOpened=true
// Trong trang web, bạn sẽ kiểm tra query param này và cập nhật localStorage
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("isAppOpened") === "true") {
  localStorage.setItem("isAppOpened", "true");
}
