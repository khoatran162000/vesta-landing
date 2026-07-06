// FILE: src/lib/siteContent.ts — fetch 1 khối SiteContent, có fallback
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchBlock(key: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_URL}/site-content/${key}`);
    const json = await res.json();
    if (json?.success && json.data?.data) return json.data.data;
  } catch {}
  return null;
}

export function resolveUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  // ảnh QR upload nằm ở /uploads/... trên API; ảnh mặc định /images/... nằm ở landing public
  if (url.startsWith("/uploads")) return `${(API_URL || "").replace(/\/api\/?$/, "")}${url}`;
  return url; // /images/... giữ nguyên (landing tự phục vụ)
}