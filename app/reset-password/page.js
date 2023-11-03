import ResetPasswordComponents from '@/components/auth/ResetPassword';
import React from 'react'

const ResetPage = ({searchParams : {token} }) => {
  console.log({token});
  return (
    <ResetPasswordComponents token = {token}/>
  )
}

export default ResetPage