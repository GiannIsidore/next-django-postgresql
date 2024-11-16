'use client';

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility function

interface AvatarProps extends React.ComponentProps<typeof Avatar> {
  username: string; // The username of the current user
  profileImage: string;
  SERVER_URL: string;
  imageProps?: React.ComponentProps<typeof AvatarImage>; // Allow customization of AvatarImage
}

const UserAvatar: React.FC<AvatarProps> = ({
  username,
  profileImage,
  SERVER_URL,
  imageProps,
  className,
  ...rest
}) => {
  const [currentPathUsername, setCurrentPathUsername] = useState<string | null>(null);

  useEffect(() => {
    // Parse the current path to extract the username dynamically
    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'rant' && pathParts[2] === 'user') {
      setCurrentPathUsername(pathParts[3]); // Extract the username from url
    }
  }, []);


  if (currentPathUsername === null) {
    return null;
  }

  // Render the avatar only if the current path username doesn't match the passed `username` sa url
  if (currentPathUsername !== username) {
    return (
     <Avatar
  className={cn("relative h-12 w-12 rounded-full overflow-hidden", className)}
  {...rest}
>
  <AvatarImage
    src={`${SERVER_URL}${profileImage}`}
    alt={username}
    className="absolute inset-0 h-full w-full object-cover"
    {...imageProps} //  props for AvatarImage
  />
  <AvatarFallback className="text-center text-sm font-medium">
    {username[0]?.toUpperCase() || '?'}
  </AvatarFallback>
</Avatar>

    );
  }

  // If the username matches, render nothing
  return null;
};

export default UserAvatar;
