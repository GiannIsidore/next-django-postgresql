'use client'

import { get_users_post } from '@/app/api/user/route'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Post {
  id: string
  description: string
  createdAt: string
}

interface PostViewProps {
  username: string
}

export default function PostView({ username }: PostViewProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await get_users_post(username)
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Failed to fetch posts', error)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [username])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://avatar.vercel.sh/${username}`} alt={username} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">{username}&apos;s Posts</h1>
      </header>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-4">
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="line-clamp-1">{post.description}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{post.description}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Posted on: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {posts.length === 0 && !loading && (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
    </div>
  )
}