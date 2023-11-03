"use server";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProfileComponent from '@/components/profile';
import { getServerSession } from "next-auth";
import React from 'react'

async function ServerPage() {
   const session = await getServerSession(authOptions);
  return (
    <div>
    <h1 style={{color : 'red'}}>Profile Server Page</h1>
    <ProfileComponent user={session?.user}/>
  </div>
  )
}

export default ServerPage