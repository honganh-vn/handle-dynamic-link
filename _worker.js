export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Lấy params từ URL
    const thumbnail = url.searchParams.get("thumbnail");
    const productName = url.searchParams.get("product_name");

    // Nếu có thumbnail hoặc product_name, render HTML động
    if (thumbnail || productName) {
      // Decode URL params (có thể bị encode nhiều lần)
      let decodedThumbnail =
        thumbnail || "https://talentbold.com/Upload/avatar/20210723/141205979_Hong-Anh-computer-logo.png";
      let decodedProductName = productName || "Hồng Anh B2B";

      try {
        while (decodedThumbnail.includes("%")) {
          const decoded = decodeURIComponent(decodedThumbnail);
          if (decoded === decodedThumbnail) break;
          decodedThumbnail = decoded;
        }
      } catch (e) {}

      try {
        while (decodedProductName.includes("%")) {
          const decoded = decodeURIComponent(decodedProductName);
          if (decoded === decodedProductName) break;
          decodedProductName = decoded;
        }
      } catch (e) {}

      const html = `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(decodedProductName)} - Hồng Anh B2B</title>
    <meta property="og:title" content="${escapeHtml(decodedProductName)}" />
    <meta property="og:image" content="${escapeHtml(decodedThumbnail)}" />
    <meta property="og:url" content="${escapeHtml(url.href)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(decodedProductName)}" />
    <meta name="twitter:image" content="${escapeHtml(decodedThumbnail)}" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="container">
      <img class="logo" src="/assets/images/logo-honganh-new.png" alt="Hồng Anh B2B" />
      <div class="text-title">Hồng Anh B2B</div>
      <button class="btn-open" onclick="handleOpenApp()">Mở ứng dụng</button>
      <version>v1.1.76</version>
    </div>
    <script src="/deeplink.js"></script>
    <script>
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
    </script>
  </body>
</html>`;

      return new Response(html, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
      });
    }

    // Không có params đặc biệt, serve static files bình thường
    return env.ASSETS.fetch(request);
  },
};

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
