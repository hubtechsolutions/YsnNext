"use client"

import {
  IconLogout,
  IconUserCircle,
  IconSun,
  IconMoon,
  IconShieldLock,
  IconUsers,
} from "@tabler/icons-react"
import { useAuthStore, USER_TYPE } from "@/lib/auth-store"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { logout, user: authUser } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  
  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  // Determine role-specific menu items
  const userType = authUser?.user_type
  const isOrg = userType === USER_TYPE.ORGANIZATION
  const isPlayer = userType === USER_TYPE.PLAYER

  const go = (path: string) => router.push(path)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-8 w-8 rounded-full cursor-pointer border border-gray-100 ">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Common: Profile */}
          <DropdownMenuItem onClick={() => go(isPlayer ? '/player-profile' : isOrg ? '/(marketing)/organization' : '/dashboard')}>
            <IconUserCircle className="mr-2 h-4 w-4" />
            <span>My Profile</span>
          </DropdownMenuItem>
          {isOrg && (
            <>
              <DropdownMenuItem onClick={() => go('/admins')}>
                <IconUsers className="mr-2 h-4 w-4" />
                <span>Admins</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => go('/coaches')}>
                <IconUsers className="mr-2 h-4 w-4" />
                <span>Coaches</span>
              </DropdownMenuItem>
            </>
          )}
          {isPlayer && (
            <>
              <DropdownMenuItem onClick={() => go('/parents')}>
                <IconUsers className="mr-2 h-4 w-4" />
                <span>Parents</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => go('/family')}>
                <IconUsers className="mr-2 h-4 w-4" />
                <span>Family</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => go('/friends')}>
                <IconUsers className="mr-2 h-4 w-4" />
                <span>Friends</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={() => go('/change-password')}>
            <IconShieldLock className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === "light" ? (
              <IconMoon className="mr-2 h-4 w-4" />
            ) : (
              <IconSun className="mr-2 h-4 w-4" />
            )}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <IconLogout className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
