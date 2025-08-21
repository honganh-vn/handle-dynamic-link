// var fallback = "https://m.shop.honganh.vn/onboarding";
// var pathAndQuery = window.location.pathname + window.location.search;
// var url = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);
// var androidPackageName = "com.honganh.sellermobile";
var iosStoreLink = "https://apps.apple.com/us/app/%C4%91%E1%BA%A1i-l%C3%BD-h%E1%BB%93ng-anh/id6470966667";
var playStoreLink = "https://play.google.com/store/apps/details?id=com.honganhprod.sellermobile&hl=vi";
// var ua = window.navigator.userAgent;

// // split the first :// from the url string
// var split = url.split(/:\/\/(.+)/);
// var scheme = split[0];
// var path = split[1] || "";
// console.log(ua);
// var urls = {
//   deepLink: url,
//   iosStoreLink: iosStoreLink,
//   android_intent: "intent://" + path + "#Intent;scheme=" + scheme + ";package=" + androidPackageName + ";end;",
//   playStoreLink: playStoreLink,
//   fallback: fallback,
// };

// var isMobile = {
//   android: function () {
//     return /Android/i.test(ua);
//   },
//   ios: function () {
//     return /iPhone|iPad|iPod/i.test(ua);
//   },
// };

// function launchWekitApproach(url, fallback) {
//   let now = Date.now();

//   window.location = url;

//   setTimeout(function () {
//     if (Date.now() - now < 2000) {
//       window.location = fallback;
//     }
//   }, 1500);
// }

// function launchIframeApproach(url, fallback) {
//   var iframe = document.createElement("iframe");
//   iframe.style.display = "none";
//   iframe.src = url;
//   document.body.appendChild(iframe);

//   var hidden = false;

//   // Nếu app mở được thì tab sẽ mất focus hoặc ẩn đi
//   function onHide() {
//     hidden = true;
//   }

//   window.addEventListener("blur", onHide);
//   document.addEventListener("visibilitychange", function () {
//     if (document.hidden) {
//       hidden = true;
//     }
//   });

//   setTimeout(function () {
//     if (!hidden) {
//       window.location = fallback;
//     }
//     // dọn event listener
//     window.removeEventListener("blur", onHide);
//   }, 1500);
// }

// function iosLaunch() {
//   // chrome and safari on ios >= 9 don't allow the iframe approach
//   if (ua.match(/CriOS/) || ua.match(/Safari/)) {
//     launchWekitApproach(urls.deepLink, urls.iosStoreLink || urls.fallback);
//   } else {
//     launchIframeApproach(urls.deepLink, urls.iosStoreLink || urls.fallback);
//   }
// }

// function androidLaunch() {
//   if (ua.match(/Chrome/)) {
//     document.location = urls.android_intent;
//   } else if (ua.match(/Firefox/)) {
//     launchWekitApproach(urls.deepLink, urls.playStoreLink || urls.fallback);
//   } else {
//     launchIframeApproach(url, urls.playStoreLink || urls.fallback);
//   }
// }

// const handleOpenApp = () => {
//   if (isMobile.ios()) {
//     iosLaunch();
//   } else if (isMobile.android()) {
//     androidLaunch();
//   } else {
//     window.location = urls.fallback;
//   }
// };

function DeepLinker(options) {
  if (!options) {
    throw new Error("no options");
  }

  var hasFocus = true;
  var didHide = false;

  // window is blurred when dialogs are shown
  function onBlur() {
    hasFocus = false;
  }

  // document is hidden when native app is shown or browser is backgrounded
  function onVisibilityChange(e) {
    if (e.target.visibilityState === "hidden") {
      didHide = true;
    }
  }

  // window is focused when dialogs are hidden, or browser comes into view
  function onFocus() {
    if (didHide) {
      if (options.onReturn) {
        options.onReturn();
      }

      didHide = false; // reset
    } else {
      // ignore duplicate focus event when returning from native app on
      // iOS Safari 13.3+
      if (!hasFocus && options.onFallback) {
        // wait for app switch transition to fully complete - only then is
        // 'visibilitychange' fired
        setTimeout(function () {
          // if browser was not hidden, the deep link failed
          if (!didHide) {
            options.onFallback();
          }
        }, 1000);
      }
    }

    hasFocus = true;
  }

  // add/remove event listeners
  // `mode` can be "add" or "remove"
  function bindEvents(mode) {
    [
      [window, "blur", onBlur],
      [document, "visibilitychange", onVisibilityChange],
      [window, "focus", onFocus],
    ].forEach(function (conf) {
      conf[0][mode + "EventListener"](conf[1], conf[2]);
    });
  }

  // add event listeners
  bindEvents("add");

  // expose public API
  this.destroy = bindEvents.bind(null, "remove");
  this.openURL = function (url) {
    // it can take a while for the dialog to appear
    var dialogTimeout = 500;

    setTimeout(function () {
      if (hasFocus && options.onIgnored) {
        options.onIgnored();
      }
    }, dialogTimeout);

    window.location = url;
  };
}

var pathAndQuery = window.location.pathname + window.location.search;
var url = "cplatform://shop.honganh.vn/" + pathAndQuery.substring(1);
function logMessage(msg) {
  const box = document.getElementById("deep-link-log");
  const p = document.createElement("p");
  p.textContent = msg;
  box.appendChild(p);
}
var linker = new DeepLinker({
  onIgnored: function () {
    logMessage("❌ Browser failed to respond to the deep link");
  },
  onFallback: function () {
    window.location = iosStoreLink;
    logMessage("↩️ Dialog hidden or user returned to tab → redirecting to store");
  },
  onReturn: function () {
    logMessage("✅ User returned to the page from the native app");
  },
});
linker.openURL(url);
