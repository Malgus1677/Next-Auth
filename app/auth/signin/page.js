import React from 'react'
import SignInTemplate from '@/components/auth/SignIn'

function SignInPage({searchParams : {callbackUrl}}) {
  return (
    <div>
        <SignInTemplate callbackUrl = {callbackUrl || "/"} />
    </div>
  )
}

export default SignInPage