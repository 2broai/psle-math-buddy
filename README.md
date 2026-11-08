# Merli Maths — luyện Toán Singapore (MOE) từ K2 đến P3

Ứng dụng web luyện toán cho trẻ theo chương trình **MOE Singapore** (NEL K1–K2 và Primary Mathematics 2021, P1–P3).
Câu hỏi được **sinh tự động** từ 204 kỹ năng × 3 mức độ, nên luyện 1–2 giờ mỗi ngày cũng không bao giờ hết bài.

- **Trang web:** https://2broai.github.io/psle-math-buddy/ (GitHub Pages, miễn phí)
- **Máy chủ lưu lịch sử:** https://merli-math-api.shiny-dream-c8b6.workers.dev (Cloudflare Worker + D1, gói miễn phí)

## Dành cho phụ huynh

1. Mở trang trên iPad bằng **Safari → Chia sẻ → Thêm vào MH chính** để dùng như một ứng dụng toàn màn hình.
2. Tạo hồ sơ cho bé (tên, năm sinh). Trình độ tự chọn theo tuổi (năm tròn 7 tuổi vào P1) và tự lên lớp mỗi tháng 1.
3. Vào **👪 Khu vực phụ huynh → Tài khoản** để tạo tài khoản: lịch sử từng câu được lưu lên đám mây và đồng bộ giữa iPad / điện thoại / máy tính.
4. Trong **Cài đặt**: mục tiêu phút/ngày, nhắc nghỉ giải lao, giới hạn tối đa mỗi ngày, tự đọc câu hỏi, mã PIN phụ huynh, giao diện **đen trắng cho máy e-ink**.

Bé có các hoạt động:

| | |
|---|---|
| 🚀 **Today's Mission** | 12 câu do hệ thống chọn: kỹ năng đang học + ôn tập + điểm yếu + 1 câu tư duy |
| 🗺️ **Learning Map** | Chọn bất kỳ kỹ năng nào theo lớp (K2, P1, P2, P3) và "thế giới" (số, cộng trừ, nhân chia, phân số, tiền, giờ, đo lường, hình học, biểu đồ, tư duy) |
| ⚡ **Speed Sprint** | 1 phút tính nhẩm nhanh (bảng cộng/trừ, bảng cửu chương) |
| 🧠 **Thinking Cap** | Bài toán tư duy kiểu Singapore: vẽ sơ đồ, làm ngược, thử và kiểm tra, lập danh sách… |
| 🔁 **Fix my mistakes** | Làm lại câu tương tự những câu đã sai |
| 🌱 **Life Skills** | Kỹ năng sống & Công dân: tình huống có tranh minh hoạ "Nếu là con, con sẽ làm gì?" — tử tế & trung thực, cảm xúc, sẵn sàng vào P1, an toàn bản thân, xử lý khẩn cấp, giao thông, sống khoẻ, công dân tốt, an toàn trên mạng. Song ngữ Anh–Việt, đọc to được |
| 🎁 **Rewards** | Sticker cho mỗi ★ đạt được, cửa hàng đồ cho linh vật Merli, cúp thành tích |

**Kỹ năng sống:** chọn sai → giải thích vì sao lựa chọn đó chưa ổn → thử lại → nhận câu "ghi nhớ". Thẻ chọn sai quay lại
vào hôm sau, thẻ đã đúng quay lại sau vài ngày → vài tuần (lặp lại ngắt quãng). Phụ huynh xem tab **🌱 Kỹ năng sống** để biết
nên trò chuyện gì với con, chọn ngôn ngữ, nơi sống (số khẩn cấp Singapore 999/995 hoặc Việt Nam 113/114/115) và bật/tắt chủ đề.

**Thích ứng trình độ:** mỗi kỹ năng có mức 1–3; đúng ngay 3 câu liền → lên mức (bé đã biết bài sẽ được "đi nhanh"),
sai 2 câu liền → xuống mức. Sai lần 1 → gợi ý; sai lần 2 → lời giải từng bước và một câu tương tự quay lại sau.

## Cấu trúc mã nguồn

```
index.html, css/app.css      giao diện (iPad-first, có chế độ e-ink)
js/main.js                   khởi động + định tuyến (#/home, #/play/…, #/parent/…)
js/core/                     store (localStorage), progress (thích ứng, phần thưởng, nhiệm vụ),
                             sync (Cloudflare API), sound (âm thanh + đọc tiếng Anh), theme, rng
js/content/                  meta.js (lớp, thế giới, chương), curriculum.js, helpers.js
js/content/gen/*.js          bộ sinh câu hỏi theo mảng — xem js/content/README.md
js/content/life/*.js         thẻ tình huống Kỹ năng sống (viết tay, song ngữ) — xem js/content/life/README.md
js/ui/visuals/*.js           hình minh hoạ SVG (khung 10, number bond, bar model, đồng hồ, tiền, thước…);
                             scene.js = 33 khung cảnh vẽ cho tranh tình huống Kỹ năng sống
js/ui/screens/*.js           các màn hình
cloudflare-backend/          Worker API + schema D1
tests/validate.mjs           kiểm tra tự động mọi bộ sinh câu hỏi
tests/gallery.html           xem mẫu câu hỏi của mọi kỹ năng (soát bằng mắt)
tests/validate-life.mjs      kiểm tra thẻ Kỹ năng sống (định dạng, song ngữ, số khẩn cấp, tranh)
tests/scenes.html            xem mọi khung cảnh tranh minh hoạ
```

## Phát triển

```bash
npm run build                             # cập nhật danh sách file cho chế độ offline (sw.js) — chạy sau mỗi lần sửa
npm test                                  # sinh & kiểm tra 150 câu × 3 mức cho mỗi kỹ năng + mọi thẻ Kỹ năng sống
node tests/validate-life.mjs --world=safe --show     # đọc các thẻ tình huống của một thế giới
node tests/validate.mjs --show=p1.add.make10 --n=5   # xem câu mẫu
python3 -m http.server 8080               # chạy thử: http://localhost:8080
# thư viện câu hỏi: http://localhost:8080/tests/gallery.html?module=addsub
```

Thêm nội dung: thêm kỹ năng vào một file trong `js/content/gen/` theo hướng dẫn `js/content/README.md`,
chạy `npm test` (phải 0 lỗi) rồi push.

## Triển khai

- **Giao diện:** push lên nhánh `main` → GitHub Pages tự cập nhật (vài phút).
- **API:** `cd cloudflare-backend && npm install && npx wrangler deploy`
  (cần biến môi trường `CLOUDFLARE_API_TOKEN` có quyền Workers Scripts + D1).
  Thay đổi schema: `npx wrangler d1 execute merli-math-db --remote --file=./schema.sql`.

## Bảo mật & dữ liệu

- Mật khẩu băm PBKDF2-SHA256 (100.000 vòng, salt riêng); phiên đăng nhập là token ngẫu nhiên, máy chủ chỉ lưu mã băm.
- Mỗi phụ huynh chỉ đọc/ghi được hồ sơ con của mình; API chỉ nhận yêu cầu từ trang web của ứng dụng (CORS).
- Giới hạn số lần đăng nhập sai. Dữ liệu lưu: tên, năm sinh, tiến độ và lịch sử câu hỏi của bé — không có dữ liệu nhạy cảm khác.
