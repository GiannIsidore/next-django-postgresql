'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/useAuth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { auth_login } = useAuth()

  const handleLogin = async (username: string, password: string) => {
    setError(null)
    auth_login(username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="relative z-10 pt-6">
          <CardTitle className="text-3xl font-extrabold text-center text-foreground mb-2">Welcome Back</CardTitle>
          <CardDescription className="text-center text-muted-foreground">Login to your account</CardDescription>
        </CardHeader>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(username, password); }}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                required
                className="bg-background text-foreground placeholder-muted-foreground border-input focus:border-ring transition-all duration-300"
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  className="bg-background text-foreground placeholder-muted-foreground border-input focus:border-ring transition-all duration-300 pr-10"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {error && <p className="text-destructive text-sm font-medium" role="alert" aria-live="assertive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-6 px-6">
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
              <LogIn className="mr-2 h-4 w-4" /> Login
            </Button>
            <div className="text-center text-muted-foreground text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline transition-all duration-300">
                Register here
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginForm
