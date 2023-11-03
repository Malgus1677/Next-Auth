import nodemailer from 'nodemailer';
import { htmlSignUp } from './htmlEmailSignUp';

const sendEmailSignUp = async ({to, url, text}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Verify your account nextAuth',
        html: htmlSignUp({url, text})
    }

    const result = await transporter.sendMail(mailOptions);
    return result;
}

export default sendEmailSignUp;