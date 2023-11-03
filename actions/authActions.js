"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/model/userModel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from "@/utils/token";
import sendEmailSignUp from "@/utils/SignUp/sendEmailSignUp";
import sendEmailForgot from "@/utils/ForgotPassword/sendEmailForgotPassword";

const BASE_URL = process.env.NEXTAUTH_URL;

export async function updateUser({ name, image }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return ('Not authorized');
    }
    try {
        const user = await User.findByIdAndUpdate(session?.user?._id, { name, image }, { new: true }).select('-password')
        if (!user) {
            throw new Error('User not found');
        }
        return { msg: 'User updated' }
    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function signUpWithCredential(data) {
    try {
        const user = await User.findOne({ email: data.email });
        if (user) {
            throw new Error('User already exist');
        }
        if (data.password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 12);
        }
        if (data.name.length < 3) {
            throw new Error('Name must be at least 3 characters');
        }

        const token = generateToken({ user: data });

        await sendEmailSignUp({
            to: data.email,
            url: `${BASE_URL}/verify?token=${token}`,
            text: 'Verify your account'
        })

        return { msg: 'User created, check yout email to verify your account' };
    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function verifyWithCredential(token) {
    try {
        const { user } = verifyToken(token);
        console.log({ user });

        const userExist = await User.findOne({ email: user.email });

        const newUser = new User(user);
        await newUser.save();

        if (userExist) return { msg: 'User already exist' };

        return { msg: 'User verified' };
    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function changePasswordWithCredential({ old_password, password, password_confirmation }) {

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new Error('Not authorized');
        }
        const user = await User.findById(session?.user?._id);
        if (!user) {
            throw new Error('User not found');
        }
        if (session?.user?.provider !== 'credentials') {
            throw new Error(`This account is signed with ${session?.user?.provider} Yous cannot change password`);
        }

        const isMatch1 = await bcrypt.compare(old_password, user.password);
        if (!isMatch1) {
            throw new Error('Old password is incorrect');
        }
        if (password !== password_confirmation) {
            throw new Error('Password confirmation is incorrect');
        }
        const newPassword = await bcrypt.hash(password, 12);
        await User.findByIdAndUpdate(session?.user?._id, { password: newPassword })

        return { msg: 'Password changed' }

    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function forgotPasswordWithCredential({ email }) {
    try {
        const user = await User.findOne({ email });
        if(!user){
            throw new Error('Email not found');
        }
        if(user.provider !== 'credentials'){
            throw new Error(`This account is signed with ${user.provider} Yous cannot change password`);
        }
        const token = generateToken({ userId: user?._id });
        await sendEmailForgot ({
            to: email,
            url: `${BASE_URL}/reset-password?token=${token}`,
            text: 'Reset your password'
        })


        return { msg: 'Check your email to reset the password' }

    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}

export async function resetPasswordWithCredential({ password, password_confirmation, token }) {
    try {
       const {userId} = verifyToken(token);
       if(password !== password_confirmation){
            throw new Error('Password confirmation is incorrect');
       }
       const newPass =  await bcrypt.hash(password, 12);
       await User.findByIdAndUpdate(userId, {password : newPass});
       console.log({newPass, password, password_confirmation, token});

       return { msg: 'Password changed' }
    } catch (error) {
        redirect(`/errors?error=${error.message}`);
    }
}