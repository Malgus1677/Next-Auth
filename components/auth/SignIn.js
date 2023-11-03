"use client";
import { signIn } from 'next-auth/react';
import React from 'react'
import Link from 'next/link';
import Button from '../Global/Button';

function SignInTemplate({callbackUrl}) {

  async function handleCredentialsLogin(formData){
    const email = formData.get('email');
    const password = formData.get('password');
    await signIn('credentials', {email, password, callbackUrl});
  }

  return (
    <div className='flex flex-col md:flex-row justify-center items-center mx-auto container h-screen'>
      <div className='  bg-gray-400  max-w-[700px] w-[70%] flex flex-col text-center p-48'>
        <h2>Sign In with NextAuth</h2>
        {/*credentials*/}
        <form className='flex flex-1 flex-col gap-6 w-full mx-auto my-4' action={handleCredentialsLogin}>
          <div className='flex flex-col w-full gap-x-6 '>
            <input className='input mb-5 p-2 group hover:border-2 hover:border-red-600 duration-200' type="email" name="email" id="email"  required />
            <input className='input mb-5 p-2 group hover:border-2 hover:border-red-600 duration-200' type="password" name="password" id="password" required/>

            <Button className="border-1 bg-white px-2 hover:border-2 w-full hover:border-blue-500" type="submit" value="Sign In"/>
          </div>
        </form>
        <div className='flex flex-col w-full gap-x-6 '>
          <Link href={`/auth/forgot-password`}>Mot de passe oublier</Link>
        </div>
        <p>------------------------------------</p>
        {/*Google*/}
        <div className='mt-5 group text-lg p-2 '>
            <button className='border-1 bg-white px-2 hover:border-2 w-full hover:border-blue-500 ' onClick={() => signIn('google', {callbackUrl})}>Continue with google</button>
        </div>
        <p>------------------------</p>
        {/*signUP*/}
        <Link  className='text-lg'href='/auth/signup'>No compte ? create him</Link>
      </div>
    </div>
  )
}

export default SignInTemplate