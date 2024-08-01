import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import styles from './Navbar.module.scss'


function Navbar(props) {

    const { theme, toggleTheme } = props

    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <Icon icon="material-symbols:search" />
                <input type="text" placeholder=' Search Notes' className={theme === 'light' ? {} : styles.inputDark} />
            </div>
            <div className={styles.darkmode} onClick={toggleTheme}>
                {/* <Icon icon="icon-park-outline:dark-mode" onClick={toggleTheme} /> */}
                {theme === 'light' ? <img src='toDark.png' style={{ height: "30px" }} /> : <img src='toLight.png' style={{ height: "30px", filter: "invert(1)" }} />}
            </div>
        </div>
    )
}

export default Navbar
