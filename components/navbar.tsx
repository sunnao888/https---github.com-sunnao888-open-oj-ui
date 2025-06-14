import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, BookOpenText, History, User } from "lucide-react" // 添加User图标
import AuthNav from "./auth-nav"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">LeCode</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-primary flex items-center gap-1">
            <BookOpenText className="h-4 w-4" />
            题目
          </Link>
          <Link href="/submissions" className="transition-colors hover:text-primary flex items-center gap-1">
            <History className="h-4 w-4" />
            提交记录
          </Link>
          <Link href="/profile" className="transition-colors hover:text-primary flex items-center gap-1">
            <User className="h-4 w-4" />
            个人中心
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/sunnao888" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
          <AuthNav />
        </div>
      </div>
    </header>
  )
}
