import React, { useRef } from 'react'
import styles from './Login.module.scss'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {

    const navigate = useNavigate();
    const nameRef = useRef(null);
    const emailRef = useRef(null)
    const passRef = useRef(null)

    const handleSignup = async (event) => {
        event.preventDefault();
        const response = await fetch(`${url}/api/auth/createuser`, {
            method: 'POSt',
            headers: {
                'Content-Type': 'application/json'  // Specify the content type
            },
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passRef.current.value
            })
        })
        const user = await response.json();
        // props.setName(user.userData.name);
        localStorage.setItem('token', user.token)
        localStorage.setItem('name', user.userData.name)

        navigate('/');
    }

    return (
        <div className={styles.container} >
            <div className={styles.left}>
                <img src="person.svg" alt="" />
                <p className={styles.heading}>Keep life Simple</p>
                <p>Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life.</p>
            </div>
            <div className={styles.right}>
                <div className={styles.logo}>
                    <Icon icon="line-md:edit" /><span><strong>Notes.</strong>me</span>
                </div>
                <button><Icon icon="bi:google" />Join with Google</button>
                <p className={styles.separator}>or signup</p>
                <form className={styles.login} onSubmit={handleSignup}>
                    <input type="text" placeholder='Enter your name' required minLength={3} ref={nameRef} />
                    <input type="email" placeholder='Enter email address' required ref={emailRef} />
                    <input type="password" placeholder='Enter your password' required minLength={8} ref={passRef} />
                    <button type='submit'><Icon icon="material-symbols:login" />Signup</button>
                </form>
                <p>Already have an account? <span><Link to='/login'>Login</Link></span></p>
            </div>
        </div>
    )
}
