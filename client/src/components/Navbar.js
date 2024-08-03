import React from 'react'
import { Icon } from '@iconify/react';
import styles from './Navbar.module.scss'


function Navbar(props) {

    const { theme, toggleTheme, handleSearch, clearSearch, search } = props



    return (
        <div className={styles.container}>
            <div className={styles.search}>
                <Icon icon="material-symbols:search" />
                <div className={styles.searchBox}>
                    <input type="text" placeholder='Search Notes' value={search} onChange={handleSearch} className={theme === 'light' ? {} : styles.inputDark} />
                    {search ? <span className={styles.clearSearch} onClick={clearSearch}>
                        <Icon icon="charm:cross" />
                    </span> : ""}
                </div>
            </div>
            <div className={styles.darkmode} onClick={toggleTheme}>
                {theme === 'light' ? <img src='toDark.png' style={{ height: "30px" }} alt="themeToggler" /> : <img src='toLight.png' style={{ height: "30px", filter: "invert(1)" }} alt="themeToggler" />}
            </div>
        </div>
    )
}

export default Navbar
