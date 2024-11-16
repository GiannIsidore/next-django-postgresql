'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Search, Home, Users, Bell, MessageSquare, User } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
const navItems = [
  { name: 'Home', href: '/rant', icon: Home },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
]

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false) // Added state for search dialog
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <TooltipProvider>
      <header className="fixed top-10 left-0 right-0 z-50 flex justify-center p-4">
        <nav
          className={`relative flex items-center justify-between rounded-full transition-all duration-300 ease-in-out ${
            isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg translate-y-0' : 'bg-transparent -translate-y-full'
          } px-4 py-2 w-full max-w-[600px]`}
        >
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            {navItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className="p-2 rounded-full hover:bg-accent transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Search Bar */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}> {/* Updated Dialog component */}
            <DialogTrigger asChild>
              <button
                className="p-2 rounded-full hover:bg-accent transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
              >
                <Search size={20} />
                <span className="sr-only">Search</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Search</DialogTitle>
              </DialogHeader>
              <div className="transition-all duration-200 ease-in-out">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full"
                  autoFocus
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Theme Toggle */}
                 <div className='grid grid-cols-2 '>
            <div className='flex flex-col items-center justify-center'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/rant/user/giann"
                    className="p-2 rounded-full hover:bg-accent transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
                  >
                    <User size={20} />
                    <span className="sr-only">User's Profile</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>User's Profile</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-accent transition-transform duration-200 ease-in-out hover:scale-110 active:scale-95"
                  >
                    <div className="transition-all duration-200 ease-in-out">
                      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </div>
                    <span className="sr-only">Toggle theme</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </nav>
      </header>
    </TooltipProvider>
  )
}
