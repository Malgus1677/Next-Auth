"use server";
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProtectedComponent from '@/components/protected';

async function ProtectedServerPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className=' flex justify-center items-center'>
        <h1>Protected Server Page</h1>
        <i style={{color : 'red'}} className='mx-5'> Server-Side</i> protected page

        <ProtectedComponent />
    </div>
  )
}

export default ProtectedServerPage