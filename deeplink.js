(function (window, document) {
  window.dataLayer = window.dataLayer || [];
  var pathAndQuery = window.location.pathname + window.location.search;
  var ua = window.navigator.userAgent;
  var orignalLink = window.location.href;

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  var isMobile = {
    android: function () {
      return /Android/i.test(ua);
    },
    ios: function () {
      return /iPhone|iPad|iPod/i.test(ua);
    },
  };

  var iosStoreLink = "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667";
  var playStoreLink = "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";

  function DeepLinker(options) {
    var uuid = generateUUID();

    this.openOnApp = function () {
      // App đã mở = tab mất focus/bị ẩn. Đây là tín hiệu tại trình duyệt,
      // không phụ thuộc server nên tức thời, không bị trễ do API chậm.
      var appOpened = false;
      var markAppOpened = function () {
        if (document.hidden) appOpened = true;
      };
      document.addEventListener("visibilitychange", markAppOpened);
      window.addEventListener("pagehide", markAppOpened);

      window.location =
        "cplatform://shop.honganh.vn/" +
        pathAndQuery.substring(1) +
        (pathAndQuery.includes("?") ? "&" : "?") +
        "uuid=" +
        uuid;

      setTimeout(function () {
        document.removeEventListener("visibilitychange", markAppOpened);
        window.removeEventListener("pagehide", markAppOpened);

        if (appOpened || document.hidden) {
          if (options.onSuccess) options.onSuccess();
          return;
        }

        // Không mở được app trong thời gian chờ -> sang Store ngay,
        // không đợi phản hồi từ deeplink-api (server free tier có thể
        // cold-start chậm vài chục giây, làm redirect bị trễ khó hiểu).
        window.location = isMobile.ios() ? iosStoreLink : playStoreLink;
        setTimeout(function () {
          window.location = orignalLink;
        }, 1000);
        if (options.onFallback) options.onFallback();
      }, 2000);
    };
  }

  window.DeepLinker = DeepLinker;
})(window, document);
