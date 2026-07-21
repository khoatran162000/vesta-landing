import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "@/styles/globals.css";
import { FloatingCTA } from "@/components/layout/FloatingCTA";
import { ContactPopup } from "@/components/layout/ContactPopup";
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
async function fetchFaviconUrl(): Promise<string | undefined> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/site-content/logo`, { next: { revalidate: 300 } });
    const json = await res.json();
    const url = json?.data?.data?.faviconUrl;
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    return `${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/api\/?$/, "")}${url}`;
  } catch { return undefined; }
}
export async function generateMetadata(): Promise<Metadata> {
  const favicon = await fetchFaviconUrl();
  return {
    title: {
      default: "VESTA Academy - Lộ Trình IELTS | Học Nhanh · Thi Chắc",
      template: "%s | VESTA Academy",
    },
    description:
      "Trung tâm luyện thi IELTS uy tín tại Hà Nội. Cam kết đầu ra, phương pháp giảng dạy hiệu quả, lộ trình cá nhân hoá. Since 2012.",
    keywords: ["IELTS", "luyện thi IELTS", "IELTS Hà Nội", "VESTA Academy", "trung tâm tiếng Anh", "IELTS 7.0"],
    openGraph: {
      title: "VESTA Academy - Lộ Trình IELTS Cốt Lõi",
      description: "Ba chặng đường — từ nền tảng đến thành thạo. Học nhanh · Thi chắc · Cam kết đầu ra.",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: "VESTA Academy",
      locale: "vi_VN",
      type: "website",
    },
    robots: { index: true, follow: true },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vestauni.vn"),
    ...(favicon ? { icons: { icon: favicon, shortcut: favicon, apple: favicon } } : {}),
  };
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="font-body">
        {children}
        <FloatingCTA />
        <ContactPopup />
      </body>
    </html>
  );
}