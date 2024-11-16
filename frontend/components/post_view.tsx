'use client'

import { get_users_post } from '@/app/api/user/route'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Heart } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toggleLike } from '../app/api/user/route';
import { revalidatePath } from 'next/cache'

interface Post {
    id: string
    description: string
    formatted_date: string
    likes: any
    like_count: number
    liked: any
}

interface PostViewProps {
    username: string
    profileImage: string;
    follower_count: number;
    following_count: number;
    bio: string;

}

export default function PostView({ username,profileImage }: PostViewProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

    const HandleToggleLike = async (id:any) => {
        const data = await toggleLike(id);

    }
    useEffect(() => {

    const fetchPosts = async () => {
      try {
        const fetchedPosts = await get_users_post(username)
          setPosts(fetchedPosts)
          console.log(posts)
      } catch (error) {
        console.error('Failed to fetch posts', error)
        setError('Failed to load posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [HandleToggleLike])

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
        {/* <Avatar className="h-12 w-12">
          <AvatarImage src={`${SERVER_URL}${profileImage}`} alt={username} />
          <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
        </Avatar> */}
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
                  Posted on: {new Date(post.formatted_date).toLocaleDateString()}
                </p>
                  </CardContent>
                  <CardFooter>
                    {
                        post.liked ? (
                            <Heart className="h-6 w-6 text-red-500 fill-current" onClick={()=> HandleToggleLike(post.id)} />
                        ) : (
                            <Heart className="h-6 w-6 text-gray-500" onClick={()=> HandleToggleLike(post.id)}/>
                        )
                    }
               <h1> {post.like_count} likes</h1>
                  </CardFooter>
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
