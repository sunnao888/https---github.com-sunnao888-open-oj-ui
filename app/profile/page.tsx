"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ProfileHeader from "@/components/profile/profile-header"
import ActivityCalendar from "@/components/profile/activity-calendar"
import EditProfileForm from "@/components/profile/edit-profile-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn === false) {
      // Check for explicit false, not just falsy, to wait for auth init
      router.push("/login")
    }
  }, [isLoggedIn, router])

  if (isLoggedIn === undefined || isLoggedIn === false || !user) {
    // Show loading skeleton while auth state is resolving or if not logged in
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto py-8">
          <div className="md:flex md:gap-8">
            <aside className="md:w-1/4 mb-8 md:mb-0">
              <Skeleton className="h-48 w-48 rounded-full mb-4" />
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2" />
            </aside>
            <section className="md:w-3/4">
              <Skeleton className="h-40 w-full mb-6" /> {/* Activity Calendar Skeleton */}
              <Skeleton className="h-64 w-full" /> {/* Edit Form Skeleton */}
            </section>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Mock activity data for the calendar
  // In a real app, this would be fetched for the user
  const mockActivity = Array.from({ length: 90 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5), // 0-4 activities
    }
  }).reverse()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="md:flex md:gap-x-8 lg:gap-x-12">
          <aside className="md:w-1/4 lg:w-1/5 mb-8 md:mb-0 flex-shrink-0">
            <ProfileHeader user={user} />
          </aside>
          <section className="md:w-3/4 lg:w-4/5">
            <ActivityCalendar activityData={mockActivity} numDays={182} /> {/* 大约6个月 */}
            <EditProfileForm user={user} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
