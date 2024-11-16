import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PostProps {
  username: string;
  content: string;
  likes: number;
  comments: number;
}

export function Post({ username, content, likes, comments }: PostProps) {
  return (
    <Card className="w-full max-w-md mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${username}`} alt={username} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="font-semibold">{username}</div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <div className="flex justify-between w-full">
          <span>{likes} likes</span>
          <span>{comments} comments</span>
        </div>
      </CardFooter>
    </Card>
  )
}
