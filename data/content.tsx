import React from 'react';

export const COURSES = [
  {
    title: "IELTS 5+",
    badge: "Đầu ra 5.0+",
    badgeClass: "badge-target",
    accentClass: "accent-blue",
    features: [
      "Nạp 200 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Xây dựng ngữ pháp từ trình độ 2.0, cam kết viết thạo bài luận chuẩn 5.5 sau một khóa",
      "Rèn kỹ năng nghe, nói, đọc, viết bài bản - đặc biệt đẩy bật kỹ năng đọc và nghe"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  10 tuần · 30 buổi</span>
        <span className="meta-chip chip-schedule"> 🕕  18:00-19:30 T2,4,6 hoặc T3,4,7</span>
        <span className="meta-chip chip-price"> 💰  8.400.000đ</span>
        <span className="meta-chip chip-schedule">Online: 7.800.000đ</span>
      </>
    ),
    dates: (
      <>
        <strong>Khai giảng 2026:</strong> 23/2, 17/3, 20/4, 26/5, 22/6, 28/7<br />
        <em>1 buổi/tuần ôn tập kiểm tra - không học mới, không quá tải.</em>
      </>
    )
  },
  {
    title: "IELTS 6+",
    badge: "Đầu ra 6.0+",
    badgeClass: "badge-target",
    accentClass: "accent-gold",
    features: [
      "Nạp 300 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Củng cố ngữ pháp, cam kết viết thạo bài luận chuẩn 6.5 sau một khóa",
      "Rèn bài bản kỹ thuật viết Task 1 chuẩn 6.5",
      "Luyện sâu kỹ năng đọc, nghe, chuẩn âm kỹ năng nói"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  12 tuần · 36 buổi</span>
        <span className="meta-chip chip-schedule"> 🕗  20:00–21:30 T2,4,6</span>
        <span className="meta-chip chip-price"> 💰  12.000.000đ</span>
        <span className="meta-chip chip-schedule">Online: 11.400.000đ</span>
      </>
    ),
    dates: <><strong>Khai giảng 2026:</strong> 16/3, 13/4, 4/5, 15/6, 6/7</>
  },
  {
    title: "IELTS 7+",
    badge: "Đầu ra 7.0+",
    badgeClass: "badge-target",
    accentClass: "accent-gold",
    features: [
      "Nạp 500 từ vựng học thuật/tuần, xoay quanh 10 chủ điểm thi IELTS",
      "Rèn bài bản kỹ thuật đọc, nghe đạt 8+",
      "Học kỹ thuật trả lời Speaking dự đoán cho kỳ thi",
      "Cam kết viết thạo bài luận chuẩn 7+ sau một khóa"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  45 buổi · 15–30 tuần</span>
        <span className="meta-chip chip-schedule"> 🕖  19:30–21:00 T3,5 hoặc T3,5,7</span>
        <span className="meta-chip chip-price"> 💰  13.600.000đ</span>
        <span className="meta-chip chip-schedule">Online: 12.800.000đ</span>
      </>
    ),
    dates: <><strong>Khai giảng 2026:</strong> 24/3, 5/5, 9/6, 21/7</>
  },
  {
    title: "IELTS 1-1 Phá Tắc Band",
    badge: "Cá nhân hóa",
    badgeClass: "badge-special",
    accentClass: "accent-mixed",
    features: [
      "Lộ trình nhanh nhất, bài tập thiết kế riêng theo năng lực từng học viên",
      "Nạp đủ từ vựng cho các chủ điểm thi IELTS",
      "Bài viết và ý mẫu cho 400 đề thi dự đoán · Chấm chữa không giới hạn",
      "Bài nói mẫu dựng sẵn với 350 câu hỏi dự đoán",
      "Cam kết tăng ít nhất 1 band sau 1 khóa"
    ],
    meta: <span className="meta-chip chip-price"> 💰  Liên hệ tư vấn</span>
  },
  {
    title: "IELTS Intensive Bứt Phá",
    badge: "6.0+ → 7.0+",
    badgeClass: "badge-target",
    accentClass: "accent-blue",
    features: [
      "Đầu vào 6.0+, đầu ra 7.0 trở lên",
      "Luyện đề đọc nghe, chữa viết nói không giới hạn",
      "Đề dự đoán tỉ lệ trúng cao, template nói viết độc đáo",
      "Chống lười và tăng band hiệu quả"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  60 buổi liên tục</span>
        <span className="meta-chip chip-schedule">10:00–16:30 T2–T7</span>
        <span className="meta-chip chip-price"> 💰  7.890.000đ</span>
      </>
    )
  },
  {
    title: "Viết — Phá Tắc Band Điểm",
    badge: "Writing 7+",
    badgeClass: "badge-target",
    accentClass: "accent-gold",
    features: [
      "20 buổi cam kết bật điểm viết lên band 7+",
      "Phương pháp viết chuẩn 4 tiêu chí chấm điểm",
      "Luyện 100 đề dự đoán mới nhất, chuẩn bị ý tưởng và từ vựng từng dạng đề",
      "Chấm và chữa bài không giới hạn"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  20 buổi</span>
        <span className="meta-chip chip-schedule">15:30 chiều T2, T4, T6</span>
        <span className="meta-chip chip-price"> 💰  7.700.000đ</span>
      </>
    )
  },
  {
    title: "Phát Âm Cơ Bản",
    badge: "Tối đa 4 người",
    badgeClass: "badge-special",
    accentClass: "accent-silver",
    features: [
      "Sửa triệt để lỗi phát âm phổ biến của người Việt",
      "Luyện âm gió, âm cuối, nối âm và ngữ điệu tự nhiên",
      "Dành cho người mất gốc, nói đều, nói lắp, nói ngọng, thiếu trọng âm",
      "Cam kết phản xạ phát âm đúng khi nói câu hoàn chỉnh"
    ],
    meta: (
      <>
        <span className="meta-chip chip-time"> ⏰  8 tuần · 24 buổi</span>
        <span className="meta-chip chip-schedule">Giờ tùy chọn</span>
        <span className="meta-chip chip-price"> 💰  5.500.000đ</span>
      </>
    )
  },
  {
    title: "Hỗ Trợ Đăng Ký Thi IELTS",
    badge: "BC & IDP",
    badgeClass: "badge-special",
    accentClass: "accent-silver",
    features: [
      "Đăng ký thi IELTS tại British Council & IDP",
      "Chọn ca thi Speaking phù hợp",
      "Quà tặng: Gói ôn luyện Premium Ready của BC trong 123 ngày"
    ],
    meta: (
      <span className="meta-chip chip-price">
        💰  4.550.000đ <small style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(gốc 4.664.000đ)</small>
      </span>
    )
  }
];

export const BOOKS = [
  { icon: "📘", title: "Giáo Trình 5+", price: "269K" },
  { icon: "📙", title: "Giáo Trình 6+", price: "289K" },
  { icon: "📗", title: "Giáo Trình 7+", price: "279K" },
  { icon: "✨", title: "SPARK 1", price: "777K" },
  { icon: "🌟", title: "SPARK 2", price: "888K" },
  { 
    icon: "🎁", 
    title: "Combo 2 cuốn SPARK", 
    price: <>1.456K <small>/ 2 cuốn</small></>, 
    customStyle: { background: "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(201,168,76,0.02))" } 
  }
];