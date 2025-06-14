"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type React from "react"

import { cn } from "@/lib/utils"

interface ActivityDay {
  date: string // YYYY-MM-DD
  count: number // Number of problems solved
}

interface ActivityCalendarProps {
  activityData: ActivityDay[]
  // For simplicity, we'll display the last ~3 months (approx 90 days)
  // A full year GitHub-style calendar is more complex to layout.
  numDays?: number
}

// Helper to get date string YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]
}

// Generate mock data for the last N days
const generateMockActivity = (numDays: number): ActivityDay[] => {
  const data: ActivityDay[] = []
  const today = new Date()
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    data.push({
      date: formatDate(date),
      count: Math.floor(Math.random() * 5), // 0 to 4 activities
    })
  }
  return data.reverse() // Chronological order
}

export default function ActivityCalendar({ activityData, numDays = 91 }: ActivityCalendarProps) {
  // Use provided data or generate mock data if empty
  const dataToDisplay = activityData.length > 0 ? activityData : generateMockActivity(numDays)

  const activityMap = new Map(dataToDisplay.map((day) => [day.date, day.count]))

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(endDate.getDate() - (numDays - 1))

  const days = []
  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    days.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  const getIntensityClass = (count: number | undefined) => {
    if (count === undefined || count === 0) return "bg-muted/30 hover:bg-muted/50"
    if (count === 1) return "bg-green-700/30 hover:bg-green-700/40 border border-green-700/50"
    if (count === 2) return "bg-green-600/50 hover:bg-green-600/60 border border-green-600/70"
    if (count === 3) return "bg-green-500/70 hover:bg-green-500/80 border border-green-500/90"
    return "bg-green-400 hover:bg-green-400/90 border border-green-400"
  }

  // Simple way to get month labels (approximate)
  const monthLabels: { label: string; colStart: number }[] = []
  let currentMonth = -1
  days.forEach((day, index) => {
    const month = day.getMonth()
    if (month !== currentMonth) {
      currentMonth = month
      if (index > 0) {
        // Don't label the very first column if it's a new month
        monthLabels.push({
          label: day.toLocaleDateString("zh-CN", { month: "short" }),
          colStart: Math.floor(index / 7) + 1,
        })
      }
    }
  })

  return (
    <TooltipProvider delayDuration={100}>
      <div className="p-4 border rounded-lg bg-card">
        <h2 className="text-lg font-semibold mb-3">刷题日历</h2>
        <div className="grid grid-flow-col grid-rows-7 gap-1 justify-start relative">
          {/* Month Labels */}
          {monthLabels.map((month, idx) => (
            <div
              key={idx}
              className="text-xs text-muted-foreground absolute -top-5"
              style={{
                gridColumnStart: month.colStart,
                gridRowStart: 1,
                transform: "translateX(calc(var(--day-size, 12px) * 0.5))",
              }}
            >
              {month.label}
            </div>
          ))}
          {/* Day cells */}
          {days.map((day) => {
            const dateStr = formatDate(day)
            const count = activityMap.get(dateStr)
            return (
              <Tooltip key={dateStr}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm", // Smaller size for more cells
                      getIntensityClass(count),
                    )}
                    style={{ "--day-size": "12px" } as React.CSSProperties}
                  />
                </TooltipTrigger>
                <TooltipContent className="text-xs">
                  <p>
                    {day.toLocaleDateString("zh-CN")} 提交了 {count || 0} 次
                  </p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
