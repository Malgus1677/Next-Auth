"use client";
import React from 'react'
import Form from '../Global/Form'
import Button from '../Global/Button'
import { resetPasswordWithCredential } from '@/actions/authActions';

const ResetPasswordComponents = ({token}) => {

    async function handleResetPassword(formData) {
        const password = formData.get('password');
        const password_confirmation = formData.get('password_confirmation');

        const res = await resetPasswordWithCredential({ password, password_confirmation, token });
        if(res?.msg) alert(res?.msg)
    }
    return (
        <div className='flex justify-center items-center mx-auto container h-screen flex-col'>
            <h1 className='flex flex-col'>Reset Password</h1>
            <Form className='mt-2 flex flex-col' action={handleResetPassword}>
                <div className='flex flex-row my-3'>
                    <label className='mx-2' htmlFor='password'>Mot de passe :</label>
                    <input type='password' id='password' name='password' placeholder='mot de passe' required />
                </div>
                <div className='flex flex-row'>
                    <label className='mx-2' htmlFor='password_confirmation'>Confirmation du mot de passe :</label>
                    <input type='password' id='password_confirmation' name='password_confirmation' placeholder='confirmation du mot de passe' required />
                </div>
                <div className='justify-center items-center'>
                <Button className='mt-5 border-1 bg-white px-2 hover:border-2 hover:border-blue-500' value='Reset Password' type='submit'/>
                </div>
            </Form>
            
        </div>
    )
}

export default ResetPasswordComponents