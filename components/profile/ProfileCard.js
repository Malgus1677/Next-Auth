
import Image from 'next/image'
import React from 'react'

const ProfileCard = ({user}) => {
  return (
    <div>
        <h2>Name : {user?.name}</h2>
        {
            user?.image && <Image src={user?.image} width={200} height={200} alt="avatar"/>
        }

        <h2>Email : {user?.email}</h2>
        <h4>Provider : {user?.provider}</h4>
        <h4>Role : {user?.role}</h4>
    </div>
  )
}

export default ProfileCard