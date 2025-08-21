(function (window, document) {
  window.dataLayer = window.dataLayer || [];

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  var ua = window.navigator.userAgent;
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
    var clickOpen = 0;

    this.openOnApp = function () {
      if (clickOpen > 0) {
        window.location = isMobile.ios() ? iosStoreLink : playStoreLink;
        return;
      }
      clickOpen++;

      var pathAndQuery = window.location.pathname + window.location.search;
      window.location =
        "cplatform://shop.honganh.vn/" +
        pathAndQuery.substring(1) +
        (pathAndQuery.includes("?") ? "&" : "?") +
        "uuid=" +
        uuid;

      setTimeout(function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://deeplink-api.onrender.com/get-open-scheme?uuid=" + uuid, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "0") {
              window.location = isMobile.ios() ? iosStoreLink : playStoreLink;
              clickOpen = 0;
              if (options.onFallback) options.onFallback();
            } else {
              clickOpen = 0;
              if (options.onSuccess) options.onSuccess();
            }
          }
        };
        xhr.send();
      }, 3000);
    };
  }

  window.DeepLinker = DeepLinker;
})(window, document);
