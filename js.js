var linker = new DeepLinker({
  onFallback: function () {
    console.log("↩️ Fallback: chuyển App Store");
  },

  onSuccess: function () {
    console.log("↩️ App mở thành công");
  },
});

const handleOpenApp = () => {
  linker.openOnApp();
};
