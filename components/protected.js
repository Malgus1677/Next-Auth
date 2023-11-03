"use client";
import { useSession } from 'next-auth/react';
import React from 'react'

function ProtectedComponent({user}) {
    const {data : session} = useSession();
  return (
    <p className='flex'>You are logged in as : <b>{session?.user?.name || user?.name}</b></p> 
  )
}

export default ProtectedComponent