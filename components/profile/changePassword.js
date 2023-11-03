import React from 'react'
import Button from '../Global/Button'
import Form from '../Global/Form'
import { changePasswordWithCredential } from '@/actions/authActions';

const changePassword = () => {
    async function handleChangePassword(formData) {
        const old_password = formData.get('old_password');
        const password = formData.get('password');
        const password_confirmation = formData.get('password_confirmation');

        const res = await changePasswordWithCredential({old_password, password, password_confirmation});
        if(res?.msg) alert(res?.msg);
    }
  return (
    <div>
        <h2>Change Password</h2>
        <Form action={handleChangePassword} className='flex flex-col mt-3 '>
            <input type="password" name='old_password' placeholder='old password' required/>
            <input  className='my-2' type="password" name='password' placeholder='password' required/>
            <input type="password" name='password_confirmation' placeholder='password confirmation' required/>
            <Button value="Change Password"/>
        </Form>
    </div>
  )
}

export default changePassword