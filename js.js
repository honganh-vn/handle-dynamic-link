// Biến để lưu trữ timeout
var timeout;

function handleOpenApp() {
  var pathAndQuery = window.location.pathname + window.location.search;
  var schemeUrl = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  var fallbackUrl = /iPhone|iPad|iPod/.test(userAgent)
    ? "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667"
    : "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";

  // Thêm sự kiện lắng nghe để hủy timeout khi người dùng rời trình duyệt
  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Thử mở app
  window.location = schemeUrl;

  // Hẹn giờ để chuyển hướng đến store
  timeout = setTimeout(function () {
    // Nếu timeout vẫn còn, tức là app chưa mở, chuyển hướng
    window.location.href = fallbackUrl;
  }, 2000); // 2 giây là khoảng thời gian hợp lý

  function handleVisibilityChange() {
    // Nếu trang web bị ẩn đi, nghĩa là người dùng đã chuyển sang app khác
    if (document.visibilityState === "hidden") {
      clearTimeout(timeout);
      // Xóa sự kiện lắng nghe để tránh rò rỉ bộ nhớ
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }
}
