"use client";
import React from 'react'
import ProfileCard from './ProfileCard';
import ProfileUpdate from './ProfileUpdate';
import ChangePassword from './changePassword';
import { useSession } from 'next-auth/react';
function ProfileComponent({user}) {
  const {data : session, update} = useSession();


  return (
    <div>Profile Component
    <ProfileCard user={session?.user || user}/>
    <ProfileUpdate update={update}/>
    {
      (session?.user?.provider === 'credentials' || user?.provider === 'credentials') && <ChangePassword/>
    }
    </div>
  )
}

export default ProfileComponent