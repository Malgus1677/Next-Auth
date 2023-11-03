"use client";
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

function Error() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
  return (
    <div className='flex justify-center items-center flex-col'>
        <h1 className=' text-red-600 text-4xl'>Errors: {error}</h1>

        <button className=" border-2 border-black bg-white px-2 hover:border-2  hover:border-blue-500 " onClick={() => router.back()}>Go back</button>
    </div>
  )
}

export default Error