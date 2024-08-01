import React from 'react'
import { Icon } from '@iconify/react';
import styles from './Sidebar.module.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Sidebar(props) {

    const navigate = useNavigate()


    const newNote = () => {
        props.setAdding(true);
    }

    const handleLogout = () => {
        localStorage.setItem('token', "");
        toast("Loggin out...")
        setTimeout(() => {

            navigate('/login')
        }, 1000);
    }


    return (
        <>
            <div className={styles.sidebar} >
                <div className={styles.logo}><Icon icon="line-md:edit" /></div>
                <div className={styles.options}>
                    <Icon icon="material-symbols:home" />
                    <Icon icon="charm:plus" onClick={newNote} />
                </div>
                <div className={styles.logout} onClick={handleLogout}>
                    <Icon icon="material-symbols:logout" />
                </div>
            </div >
        </>
    )
}