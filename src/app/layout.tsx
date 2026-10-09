import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社Smile lims | 人と企業の可能性を、あたらしい明日の力に。",
  description: "株式会社Smile limsの企業紹介サイト。理念・事業・会社概要をご紹介します。社名以外の掲載情報は仮のサンプルです。",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
