import React, { useRef } from 'react'
import styles from './Login.module.scss'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../assets'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login(props) {

    const emailRef = useRef(null);
    const passRef = useRef(null);

    const navigate = useNavigate();


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  // Specify the content type
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passRef.current.value
                })
            })

            const user = await response.json();

            if (!response.ok) {
                toast.error(user.alert)
                return;
            }

            localStorage.setItem('token', user.token)
            localStorage.setItem('name', user.name)
            toast.success("Success, loggin you in...")
            setTimeout(() => {
                navigate('/');
            }, 1000);
        }
        catch (error) {
            toast.error('An unexpected error occurred. Please try again later.');
        }
    }


    const togglePassword = () => {
        const passwordInput = document.getElementById('passwordInput');
        const toggler = document.getElementById('togglePassword');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggler.textContent = "🙈"
        }
        else {
            passwordInput.type = 'password';
            toggler.textContent = "👁️"
        }
    }


    return (
        <div className={styles.container} >
            <div className={styles.left}>
                <img src="person.svg" alt="" />
                <p className={styles.heading}>Keep life Simple</p>
                <p>Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life.</p>
            </div>
            <ToastContainer />
            <div className={styles.right}>
                <div className={styles.logo}>
                    <Icon icon="line-md:edit" /><span><strong>Notes.</strong>me</span>
                </div>
                <button><Icon icon="bi:google" />Join with Google</button>
                <p className={styles.separator}>or login</p>
                <form className={styles.login} onSubmit={handleLogin}>
                    <input type="email" placeholder='Enter email address' required ref={emailRef} />
                    <div className={styles.password}>
                        <input type="password" placeholder='Enter your password' required minLength={8} ref={passRef} id='passwordInput' />
                        <span className={styles.togglePassword} onClick={togglePassword} id='togglePassword'>👁️</span>
                    </div>
                    <button type="submit"><Icon icon="material-symbols:login" />Login</button>
                </form>

                <p>Don't have an account? <span><Link to='/signup'>Signup</Link></span></p>
            </div>
        </div>
    )
}
