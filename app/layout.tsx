import "./globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.everspark.co.kr'),
  title: {
    default: "네이버 마케팅 전문 코칭 & 대행 | EverSpark",
    template: "%s | EverSpark",
  },
  description: "네이버 블로그와 플레이스 마케팅 전문. 중소사업자의 온라인 성장을 돕습니다.",
  keywords: ["네이버 마케팅", "네이버 블로그", "네이버 플레이스", "스마트플레이스", "블로그 마케팅", "로컬 마케팅", "검색 노출", "상위 노출"],
  authors: [{ name: "EverSpark" }],
  creator: "EverSpark",
  publisher: "EverSpark",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-1003903987965954",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
        <head>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1003903987965954"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </body>
    </html>
  )
}
