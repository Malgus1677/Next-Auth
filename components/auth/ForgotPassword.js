"use client";
import { forgotPasswordWithCredential } from '@/actions/authActions';
import Button from '@/components/Global/Button';
import Form from '@/components/Global/Form';
import React from 'react';

function forgotPasswordTemplate() {
    async function handleForgotPassword(formData) {
        const email = formData.get('email');
        const res = await forgotPasswordWithCredential({ email });

        if (res?.msg) {
            alert(res?.msg);
        }
    }
    return (
        <div className='flex flex-col md:flex-row justify-center items-center mx-auto container h-screen'>
            <div className='  bg-gray-400  max-w-[700px] w-[70%] flex flex-col text-center p-48'>
                <h2>Sign In with NextAuth</h2>
                {/*credentials*/}
                <form className='flex flex-1 flex-col gap-6 w-full mx-auto my-4' action={handleForgotPassword}>
                    <div className='flex flex-col w-full gap-x-6 '>
                        <input className='input mb-5 p-2 group hover:border-2 hover:border-red-600 duration-200' type="email" name="email" id="email" placeholder='email'required />
                       
                        <Button className="border-1 bg-white px-2 hover:border-2 w-full hover:border-blue-500" type="submit" value="Change Password" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default forgotPasswordTemplate