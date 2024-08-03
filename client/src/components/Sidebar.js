import React from 'react'
import { Icon } from '@iconify/react';
import styles from './Sidebar.module.scss'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Sidebar(props) {

    const navigate = useNavigate()

    const { setAdding, allNotes, pinnedNotes } = props


    const newNote = () => {
        setAdding(true);
    }

    const handleLogout = () => {
        localStorage.setItem('token', "");
        toast.success("Loggin out...")
        setTimeout(() => {

            navigate('/login')
        }, 1000);
    }


    return (
        <>
            <div className={styles.sidebar} >
                <div className={styles.logo}><Icon icon="line-md:edit" /></div>
                <div className={styles.options}>

                    <Icon icon="material-symbols:home" onClick={allNotes} data-mdb-ripple-init />
                    <Icon icon="mdi:tag" onClick={pinnedNotes} />
                    <Icon icon="charm:plus" onClick={newNote} />

                </div >
                <div className={styles.logout} onClick={handleLogout}>
                    <Icon icon="material-symbols:logout" />
                </div>
            </div>
        </>
    )
}