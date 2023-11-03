"use client";
import React from "react";
import Form from "../Global/Form";
import Button from "../Global/Button";
import { signUpWithCredential } from "@/actions/authActions";

function SignUp() {
  async function handleSignUpWithCredentials(formData){
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');


    const res = await signUpWithCredential({name, email, password});
    if(res?.msg){
      alert(res?.msg);
    }
    
  }
  return (
    <div className="flex flex-col md:flex-row justify-center items-center mx-auto container h-screen">
      <div className="  bg-gray-400  max-w-[700px] w-[70%] flex flex-col text-center p-48">
      <h2>Sign Up with NextAuth</h2>
        <Form action={handleSignUpWithCredentials} className="flex flex-1 flex-col gap-6 w-full mx-auto my-4">
          <div className="flex flex-col w-full gap-x-6">
            <input className="input mb-5 p-2 group hover:border-2 hover:border-red-600" type="text" name="name" id="name" placeholder="name"  required/>
            <input className="input mb-5 p-2 group hover:border-2 hover:border-red-600" type="email" name="email" id="email" placeholder="email" required/>
            <input className="input mb-5 p-2 group hover:border-2 hover:border-red-600" type="password" name="password" id="password" placeholder="password" required />
          </div>
          <Button className="border-1 bg-white px-2 hover:border-2 w-full hover:border-blue-500" type="submit" value="Sign Up"/>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
