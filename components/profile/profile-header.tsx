import type { UserProfile } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderProps {
  user: UserProfile
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <Avatar className="h-40 w-40 md:h-48 md:w-48 mb-4 border-4 border-background shadow-lg">
        <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.nickname} />
        <AvatarFallback className="text-4xl">
          {user.nickname?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-bold">{user.nickname}</h1>
      <p className="text-lg text-muted-foreground">@{user.username}</p>
      {/* Optional: Add a bio or other info here */}
      {/* <Button variant="outline" size="sm" className="mt-4 w-full">Edit profile</Button> */}
    </div>
  )
}
