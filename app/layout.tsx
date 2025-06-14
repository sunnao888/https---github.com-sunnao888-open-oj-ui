import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster" // Import Toaster

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeCode - 开源面试刷题平台", // Updated title
  description: "LeetCode拙劣的模仿者", // Updated description
    generator: 'https://github.com/sunnao888'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AuthProvider>
          <MouseMoveEffect />
          {children}
          <Toaster /> {/* Add Toaster here */}
        </AuthProvider>
      </body>
    </html>
  )
}
