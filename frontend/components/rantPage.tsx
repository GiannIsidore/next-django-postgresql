import React from 'react'
import { Post } from '@/components/post'

const mockPosts = [
  { username: "alice", content: "Just had the worst customer service experience ever! 😡", likes: 15, comments: 3 },
  { username: "bob", content: "Why is traffic always so bad when I'm running late? 🚗😤", likes: 8, comments: 2 },
  { username: "charlie", content: "Can't believe how expensive groceries have become! 💸", likes: 20, comments: 5 },
  { username: "diana", content: "My neighbor's dog won't stop barking. I haven't slept in days! 🐶😫", likes: 12, comments: 4 },
  { username: "evan", content: "Just spent 2 hours on hold with tech support. Still no resolution. 📞😑", likes: 18, comments: 6 },
  { username: "fiona", content: "Why do people not know how to use turn signals? It's not that hard! 🚦🤬", likes: 25, comments: 8 },
  { username: "george", content: "Another day, another meeting that could have been an email. 💼😒", likes: 30, comments: 7 },
  { username: "hannah", content: "The wifi at this cafe is slower than a snail. How am I supposed to work? ☕️🐌", likes: 10, comments: 2 },
  { username: "ian", content: "Just got cut off in line at the coffee shop. Some people have no manners! ☕️😠", likes: 14, comments: 3 },
  { username: "julia", content: "Why is the AC always set to Arctic temperatures in every office? 🥶", likes: 22, comments: 5 },
]

const RantPage = () => {
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Rant Page</h1>
      <div className="w-full max-w-md">
        {mockPosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  )
}

export default RantPage
