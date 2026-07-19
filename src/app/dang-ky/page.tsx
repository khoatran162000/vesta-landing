// FILE: src/app/dang-ky/page.tsx — Redirect sang Google Form đăng ký (bỏ form tự tạo tài khoản)
import { redirect } from "next/navigation";
import { SITE_INFO } from "@/lib/constants";

export default function RegisterPage() {
  redirect(SITE_INFO.registerLink);
}