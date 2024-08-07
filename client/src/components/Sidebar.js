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
                    <abbr title="Home">
                        <Icon icon="material-symbols:home" onClick={allNotes} data-mdb-ripple-init />
                    </abbr>
                    <abbr title="Pinned Notes">
                        <Icon icon="mdi:tag" onClick={pinnedNotes} />
                    </abbr>
                    <abbr title="New Note">
                        <Icon icon="charm:plus" onClick={newNote} />
                    </abbr>

                </div >
                <div className={styles.logout} onClick={handleLogout}>
                    <abbr title="Logout">
                        <Icon icon="material-symbols:logout" />
                    </abbr>
                </div>
            </div>
        </>
    )
}