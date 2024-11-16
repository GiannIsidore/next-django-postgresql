'use client'

import { useParams } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"
import { useEffect, useState } from 'react'
import { get_user_profile_details, toggleFollow } from '@/app/api/user/route'

import PostView from '@/components/post_view'

interface User {
    username: string;
    profile_image: string;
    follower_count: number;
    following_count: number;
    bio: string;
}
const UserPage = () => {
    const { username } = useParams()
    const [loading, setLoading] = useState(true)
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)
    const SERVER_URL= process.env.NEXT_PUBLIC_SERVER_URL
    const [isOurProfile, setIsOurProfile] = useState(false)
    const [following, setFollowing] = useState(false)

    const handleToggleFollow = async () => {
        const data = await toggleFollow(username);
        console.log(data)
        if (data.now_following) {
            setFollowerCount(followerCount + 1)
            setFollowing(true)
        } else {
            setFollowerCount(followerCount - 1)
            setFollowing(false)
        }
    }
    useEffect(() => {
       const fetch_user_profile_details = async () => {
         try {
            const response = await get_user_profile_details(username)
             console.log(response)

             setBio(response.bio)
             setProfileImage(response.profile_image)
             setFollowerCount(response.follower_count)
             setFollowingCount(response.following_count)

             setIsOurProfile(response.is_our_profile)
             setFollowing(response.following)
         } catch (error) {
            console.log(error)
         }finally{
            setLoading(false)
         }
        }
        fetch_user_profile_details()
     }, [username])

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 p-4'>
      <Card className="col-span-1">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={`${SERVER_URL}${profileImage}`} alt={`${username}'s profile picture`} />
            <AvatarFallback>{(username as string)?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{username}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span className="font-semibold text-foreground">{followerCount}</span> followers
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              <span className="font-semibold text-foreground">{followingCount}</span> following
            </div>
                  </div>
                  {
                      loading ?
                          'Loading...'
                          :
                      isOurProfile ?
                          <Button variant="outline" className="w-full">Edit Profile</Button>
                       :
                          <Button variant="outline" className="w-full" onClick={handleToggleFollow}>{following ? 'Unfollow' : 'Follow'}</Button>

                  }

          <p className="text-center text-sm">{bio}</p>
        </CardContent>
      </Card>
      <div className="col-span-2">
         <PostView username={username as string} profileImage={profileImage} follower_count={followerCount} following_count={followerCount} bio={bio}  />
      </div>
    </div>
  )
}

export default UserPage
