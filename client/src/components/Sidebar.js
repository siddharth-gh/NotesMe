import React from 'react'
import { Icon } from '@iconify/react';
import styles from './Sidebar.module.scss'
import { useNavigate } from 'react-router-dom';

export default function Sidebar(props) {

    const navigate = useNavigate()


    const newNote = () => {
        props.setAdding(true);
    }

    const handleLogout = () => {
        localStorage.setItem('token', "");
        navigate('/login')
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