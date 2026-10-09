import type { Metadata } from "next";
import "./globals.css";
import { company } from "./company";

export const metadata: Metadata = {
  title: `${company.name} | ${company.tagline}`,
  description: `${company.name}は大阪を拠点に、不動産売買・賃貸仲介・パーソナルトレーニングを通じて、あなたらしい毎日に寄り添います。事業紹介・会社概要・お問い合わせをご案内します。`,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
