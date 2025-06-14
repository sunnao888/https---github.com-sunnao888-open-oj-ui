"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation" // Corrected import
import { useAuth } from "@/components/auth-provider"
import type { Problem } from "@/types/problem"

interface ProblemLinkProps {
  problem: Problem
  children: React.ReactNode
  className?: string
}

export default function ProblemLink({ problem, children, className }: ProblemLinkProps) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isLoggedIn) {
      e.preventDefault() // Important: Prevent default Link behavior
      router.push("/login") // Redirect to login page
    }
    // If logged in, the default Link behavior will navigate to `/problems/${problem.id}`
  }

  return (
    <Link href={`/problems/${problem.id}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
