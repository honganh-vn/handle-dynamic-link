(function (window, document) {
  window.dataLayer = window.dataLayer || [];

  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function DeepLinker(options) {
    var uuid = generateUUID();
    var clickOpen = 0;

    this.openOnApp = function () {
      if (clickOpen > 0) {
        window.location = options.storeUrl;
        return;
      }
      clickOpen++;

      var pathAndQuery = window.location.pathname + window.location.search;
      window.location = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1) + "&uuid=" + uuid;

      // Sau 3s → check với server
      setTimeout(function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", options.checkApi + "?uuid=" + uuid, true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "0") {
              // App không mở được → fallback App Store
              window.location = options.storeUrl;
              if (options.onFallback) options.onFallback();
            } else {
              // App mở được → reset clickOpen
              clickOpen = 0;
              if (options.onSuccess) options.onSuccess();
            }
          }
        };
        xhr.send();
      }, 3000);
    };
  }

  // expose global
  window.DeepLinker = DeepLinker;
})(window, document);
