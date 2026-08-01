// FILE: src/components/shop/PaymentQR.tsx — QR chuyển khoản VietQR động (số tiền + nội dung = mã đơn)
"use client";
// Techcombank: BIN 970407. TK VESTA UNI 123777789.
const BANK_BIN = "970407";
const ACCOUNT_NO = "123777789";
const ACCOUNT_NAME = "VESTA UNI";
const fmtVND = (n: number) => n.toLocaleString("vi-VN") + "₫";

export default function PaymentQR({ amount, code }: { amount: number; code: string }) {
  const qr = `https://img.vietqr.io/image/${BANK_BIN}-${ACCOUNT_NO}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(code)}&accountName=${encodeURIComponent(ACCOUNT_NAME)}`;
  return (
    <div className="rounded-2xl border border-gold/40 bg-white p-5 text-center shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#1B2A5C]">Quét QR để chuyển khoản</p>
      <img src={qr} alt="QR chuyển khoản" className="mx-auto my-3 h-[220px] w-[220px] rounded-lg border border-silver/30" />
      <div className="space-y-1 text-sm text-[#1B2A5C]">
        <div>Ngân hàng: <b>Techcombank</b></div>
        <div>Số TK: <b>{ACCOUNT_NO}</b> — {ACCOUNT_NAME}</div>
        <div>Số tiền: <b className="text-lg text-[#B22234]">{fmtVND(amount)}</b></div>
        <div>Nội dung CK: <b className="rounded bg-gold/15 px-2 py-0.5 text-[#A6882E]">{code}</b></div>
      </div>
      <p className="mt-3 text-xs text-gray-500">Vui lòng chuyển đúng nội dung <b>{code}</b> để hệ thống đối chiếu. Sau khi xác nhận thanh toán, bạn sẽ nhận tài liệu/bài chữa.</p>
    </div>
  );
}