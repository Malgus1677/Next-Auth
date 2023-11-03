"use client";
import React from 'react'
import Form from '../Global/Form';
import { updateUser } from '@/actions/authActions';
import Button from '../Global/Button';
function ProfileUpdate({update}) {

  async function handleUpdateProfile(formData) {
    const name = formData.get('name');
    const image = formData.get('image');

    if(update){
      update({name, image});
    }

    const res = await updateUser({name, image});
  }
  return (
    <div className='flex flex-row mt-4 p-2 justify-center items-center'>
      <h2>Update Profile</h2>  

      <Form action={handleUpdateProfile} className='mx-2'>
        <input  type="text" name='name' placeholder='Your name' required/>
        <input  type="text" name='image' placeholder='image 'required />
        <Button value="Update Profile"/>
      </Form>      
    </div>
  )
}

export default ProfileUpdate