import type { SubmissionStatus } from "@/types/submission"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle, XCircle, AlertTriangle, Clock, Loader2, HelpCircle } from "lucide-react"

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus
  showIcon?: boolean
}

export default function SubmissionStatusBadge({ status, showIcon = true }: SubmissionStatusBadgeProps) {
  const statusMap = {
    "Accepted": "通过",
    "Wrong Answer": "答案错误",
    "Time Limit Exceeded": "超时", 
    "Runtime Error": "运行错误",
    "Compilation Error": "编译错误",
    "Pending": "等待中",
    "Judging": "判题中"
  }

  const statusConfig = {
    Accepted: {
      className: "bg-green-500/20 text-green-400 hover:bg-green-500/30",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
    },
    "Wrong Answer": {
      className: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
      icon: <XCircle className="h-3.5 w-3.5" />,
    },
    "Time Limit Exceeded": {
      className: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30",
      icon: <Clock className="h-3.5 w-3.5" />,
    },
    "Runtime Error": {
      className: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30",
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
    },
    "Compilation Error": {
      className: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30",
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
    },
    Pending: {
      className: "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30",
      icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    },
    Judging: {
      className: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
      icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    },
  }

  const config = statusConfig[status] || {
    className: "bg-gray-400/20 text-gray-300",
    icon: <HelpCircle className="h-3.5 w-3.5" />,
  }

  return (
    <Badge className={cn("font-semibold text-xs", config.className)}>
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {statusMap[status] || status}
    </Badge>
  )
}
